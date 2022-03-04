import React, { createContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useFirestore } from "../hook/useFirestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const {
    user: { uid }
  } = React.useContext(AuthContext);
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  const [addRoomVisable, setAddRoomVisable] = useState(false);
  const [addMemberVisable, setAddMemberVisable] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const selectedRoom = React.useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members
    };
  }, [selectedRoom.members]);
  const members = useFirestore("users", usersCondition);
  const messagesCondition = React.useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id
    };
  }, [selectedRoom]);
  const messages = useFirestore("messages", messagesCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        addRoomVisable,
        setAddRoomVisable,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        addMemberVisable,
        setAddMemberVisable,
        messages
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
