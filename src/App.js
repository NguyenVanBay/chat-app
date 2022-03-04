import React from 'react';
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import AddMemberModal from "./components/Modals/AddMemberModal";

import "antd/dist/antd.css";
import "./index.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <AddRoomModal />
          <AddMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
