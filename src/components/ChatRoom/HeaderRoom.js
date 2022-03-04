import React from "react";
import { Avatar, Button, Typography } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { UsergroupAddOutlined } from "@ant-design/icons";

import styled from "styled-components";

const { Text } = Typography;
const HeaderRoomStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px;
  padding: 20px;
  background: #fff;

  .userOnline {
    width: 20%;
    display: flex;
    justify-content: flex-end;
  }

  .avataGroup {
    margin-right: 10px;
  }
`;

export default function HeaderRoom() {
  const { members, selectedRoom, setAddMemberVisable } = React.useContext(AppContext);

  return (
    Object.keys(selectedRoom).length > 0 && (
      <HeaderRoomStyled>
        <div>
          <Text type="success">{selectedRoom.name}</Text>
          <br />
          <Text type="italic">{selectedRoom.description}</Text>
        </div>
        <div className="userOnline">
          <Avatar.Group
            className="avataGroup"
            size="lager"
            maxCount={2}
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {members &&
              members.map((member) => {
                return (
                  <Avatar src={member.photoURL} key={member.displayName}>
                    {member.photoURL
                      ? ""
                      : member.displayName.charAt(0).toUpperCase()
                    }
                  </Avatar>
                );
              })}
          </Avatar.Group>

          <Button
            onClick={() => setAddMemberVisable(true)}
            icon={<UsergroupAddOutlined />}
            type="primary"
          >
            Thêm thành viên
          </Button>
        </div>
      </HeaderRoomStyled>
    )
  );
}
