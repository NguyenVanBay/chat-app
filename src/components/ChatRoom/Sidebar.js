import React from "react";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import { Row } from "antd";
export default function Sidebar() {
  return (
    <Row style={{ background: "#91d5ff", color: "#fff" }}>
      <UserInfo />
      <RoomList />
    </Row>
  );
}
