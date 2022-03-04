import React from "react";
import { List, Avatar, Tag } from "antd";

export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <>
      <List.Item.Meta
        avatar={<Avatar src={photoURL} />}
        title={<a href="https://ant.design">{displayName}</a>}
        description={text}
      />
      <Tag color="lime">{createdAt}</Tag>
    </>
  );
}
