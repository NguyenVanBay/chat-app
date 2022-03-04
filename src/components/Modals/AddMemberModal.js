import React from "react";
import { Modal, Form, Select } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { useFirestore } from "../../hook/useFirestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AddMemberModal() {
  const { addMemberVisable, setAddMemberVisable, selectedRoom } = React.useContext(
    AppContext
  );
  const [form] = Form.useForm();
  const users = useFirestore("users");
  const options = users.filter(user => selectedRoom.members && !selectedRoom.members.includes(user.uid)).map(user => user.displayName);
  const [usersSelected, setUsersSelected] = React.useState([]);
  const filteredOptions = options.filter(o => usersSelected && !usersSelected.includes(o));

  async function handleOk() {
    const docRef = doc(db, 'rooms', selectedRoom.id);
    await updateDoc(docRef, {
      members: [...selectedRoom.members, ...users.filter(user => usersSelected && usersSelected.includes(user.displayName)).map(user => user.uid)]
    });

    setUsersSelected([]);
    setAddMemberVisable(false);
  };
  const handleCancel = () => {
    setAddMemberVisable(false);
  };
  const handleChange = (selectedItems) => {
    setUsersSelected(selectedItems);
  };


  return (
    <Modal
      title="Thêm thành viên vào nhóm"
      visible={addMemberVisable}
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
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={usersSelected}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {filteredOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
}
