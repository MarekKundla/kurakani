import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import React, { useState } from "react";
import { AiFillPlusCircle, AiFillLike } from "react-icons/ai";
import { BsImage, BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

function ChatFooter({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState<string>("");
  const { socket } = useSocket();
  const { username } = useUser();

  const handleSendMessage = (e: any, message: string) => {
    e.preventDefault();
    if (message.trim()) {
      socket?.emit("send_message", {
        text: message,
        name: username,
        socketId: socket.id,
        roomId: roomId,
      });
    }
    setMessage("");
  };

  const handleTyping = () => {
    socket?.emit("typing", message ? username + " is typing ..." : "");
  };

  return (
    <div className="basis-[8%] border-t-2 p-2 flex items-center gap-4">
      {message.length === 0 && (
        <>
          <AiFillPlusCircle size={20} className="cursor-pointer text-primary" />
          <BsImage size={20} className="cursor-pointer text-primary" />
        </>
      )}
      <div className="relative w-full">
        <BsEmojiSmileFill
          size={20}
          className="cursor-pointer absolute top-[6px] right-2 text-primary"
        />
        <form onSubmit={(e) => handleSendMessage(e, message)}>
          <input
            type="text"
            value={message}
            className="p-2 w-full h-8 bg-gray-100 rounded-full transition-all focus:outline-none"
            placeholder="Aa"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleTyping}
          />
        </form>
      </div>
      {message.length === 0 ? (
        <AiFillLike
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, "👍")}
        />
      ) : (
        <IoMdSend
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, message)}
        />
      )}
    </div>
  );
}

export default ChatFooter;
