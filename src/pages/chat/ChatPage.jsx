import Sidebar
  from "../../components/chats/Sidebar";

import ChatWindow
  from "../../components/chats/ChatWindow";
import { useState } from "react";

export default function ChatPage() {
  const [mobileSidebarOpen,
    setMobileSidebarOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] =
    useState(null);
  return (
    <div className="min-h-screen bg-[#050505] flex overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-225 h-125 bg-fuchsia-600/20 blur-3xl rounded-full"></div>

        <div className="absolute -bottom-37.5 -right-25 w-125 h-125 bg-violet-500/15 blur-3xl rounded-full"></div>

        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[60px_60px]"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={
          setMobileSidebarOpen
        }
      />

      {/* Chat Window */}
      <ChatWindow
        selectedUser={selectedUser}
        setMobileSidebarOpen={
          setMobileSidebarOpen
        }
      />
    </div>
  );
}