import React from "react";
import { Menu, Switch, Divider, Col, Button } from "antd";
import { AppstoreOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

import styled from "styled-components";

const RoomListStyled = styled.div`
  width: 100%;
  padding: 20px 0px;
  background: #2eaeeb;

  .action {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
  }

  .menu {
    height: 100%;
  }
`;

const { SubMenu } = Menu;

export default function RoomList() {
  const { rooms, setAddRoomVisable, setSelectedRoomId } = React.useContext(
    AppContext
  );
  const [mode, setMode] = React.useState("inline");
  const [theme, setTheme] = React.useState("light");

  const changeMode = (value) => {
    setMode(value ? "vertical" : "inline");
  };

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <RoomListStyled>
      <Col span={24} style={{ width: "100%" }}>
        <div className="action">
          <Switch onChange={changeMode} /> Change Mode
          <Divider type="vertical" />
          <Switch onChange={changeTheme} /> Change Style
        </div>
        <Menu
          className="menu"
          style={{ width: "100%", margin: 0, padding: 0 }}
          mode={mode}
          theme={theme}
        >
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Rooms">
            {rooms && rooms.map((room) => {
              return <Menu.Item
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
              >
                {room.name}
              </Menu.Item>
            })}
          </SubMenu>
          <Menu.Item key="addroom">
            <Button
              type="primary"
              icon={<AppstoreAddOutlined />}
              onClick={(e) => setAddRoomVisable(true)}
            >
              AddRoom
            </Button>
          </Menu.Item>
        </Menu>
      </Col>
    </RoomListStyled>
  );
}
