import React from "react";
import { Col, Button, Avatar, Image, notification } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { useContext } from "react";

const openNotification = (placement, context) => {
  notification.info({
    message: context,
    description: `You are ${context}`,
    placement
  });
};

const UserInfoStyled = styled.div`
  width: 100%;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  height: 60px;

  .user-info {
    padding: 10px;
    display: flex;
    height: 50px;
  }

  .avatar {
    margin-right: 5px;
  }

  .user-info h3 {
    margin-top: 5px;
    color: #fff;
    font-size: 14px;
  }

  .logout {
    padding: 10px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL }
  } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogut = () => {
    signOut(auth)
      .then(() => {
        openNotification("topRight", "Logout success!");
        navigate("/login");
      })
      .catch((error) => {
        openNotification("topRight", "Logout fail!");
      });
  };

  return (
    <UserInfoStyled>
      <Col className="user-info">
        <Avatar
          className="avatar"
          src={<Image src={photoURL} style={{ width: 32 }} />}
        />
        <h3>{displayName}</h3>
      </Col>
      <Col className="logout">
        <Button onClick={handleLogut} type="danger" icon={<PoweroffOutlined />}>
          Đăng xuất
        </Button>
      </Col>
    </UserInfoStyled>
  );
}
