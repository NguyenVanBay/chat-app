import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import styled from "styled-components";

const SidebarStyled = styled.div`
  width: 30%;
  border-right: 1px solid #999;
  color: #fff;
  background: "#91d5ff";
  min-height: 100vh;
`;

const ChatWindowStyled = styled.div`
  width: 70%;
`;

export default function ChatRoom() {
  return (
    <Layout style={{ display: "flex", flexFlow: "row" }}>
      <SidebarStyled>
        <Sidebar />
      </SidebarStyled>
      <ChatWindowStyled>
        <ChatWindow />
      </ChatWindowStyled>
    </Layout>
  );
}
