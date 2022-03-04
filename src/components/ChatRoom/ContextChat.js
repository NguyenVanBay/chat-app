import React from "react";
import { List, Input, Layout, Avatar, Form, Button } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { useFirestore } from "../../hook/useFirestore";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
export default function ContextChat() {
  const { messages } = React.useContext(AppContext);
  const { Content, Footer } = Layout;
  const users = useFirestore("users");
  const UserInfo = (uid) => users.find(user => user.uid === uid);
  const { selectedRoomId } = React.useContext(AppContext);
  const {
    user: { uid }
  } = React.useContext(AuthContext);
  const onFinish = (values) => {
    form.resetFields();
    addDocument('messages', { ...values, roomId: selectedRoomId, userId: uid })
  };
  const [form] = Form.useForm();

  return (
    <>
      <Content style={{ margin: "24px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360, background: "#fff", marginBottom: 20 }}
        >
          {messages &&
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    key={item.id}
                    avatar={<Avatar src={UserInfo(item.userId).photoURL ? UserInfo(item.userId).photoURL : "https://joeschmoe.io/api/v1/random"} />}
                    title={<a>{UserInfo(item.userId).displayName}</a>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          }
        </div>

        {selectedRoomId && <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          colon={false}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Nhập Nội dung!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Bayka ©2022 Created by Nguyễn Văn Bảy
      </Footer>
    </>
  );
}