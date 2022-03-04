import React, { useContext } from "react";
import { Modal, Form, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddRoomModal() {
  const { addRoomVisable, setAddRoomVisable } = useContext(AppContext);
  const {
    user: { uid }
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    const data = form.getFieldValue();
    addDocument("rooms", { ...data, members: [uid] });

    form.resetFields();
    setAddRoomVisable(false);
  };
  const handleCancel = () => {
    setAddRoomVisable(false);
  };

  return (
    <Modal
      title="Add room"
      visible={addRoomVisable}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        form={form}
      >
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: "Nhập tên phòng!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ message: "Nhập mô tả!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
