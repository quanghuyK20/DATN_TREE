import Conversation from "../../../components/messenger/conversations/Conversation";
import Message from "../../../components/messenger/message/Message";
import ChatOnline from "../../../components/messenger/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import useAuth from "hooks/useAuth";
import "./Messenger.scss";
import Header from "components/header";
// ../../assets/images/tree.gif'
import gif from "../../../assets/images/tree.gif";
import messageNodeApi from "api/messageNodeApi";

export default function Messenger() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET);
    socket.current.on("getMessage", async (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      // const res = await messageNodeApi.getMessageById(currentChat?.id);
      // setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const aCurrentChatId = [currentChat?.sender_id, currentChat?.receiver_id];
    arrivalMessage &&
      aCurrentChatId?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        // const res = await axios.get("http://localhost:9000/api/conversations/" + user.id);
        const res = await messageNodeApi.getConversationById(user.id);
        const conversationData = [];
        for (const item of res.data) {
          const senderId = item.sender.id;
          if (senderId === user.id) {
            delete item.sender;
            item.user = item.receiver;
            delete item.receiver;
          } else {
            delete item.receiver;
            item.user = item.sender;
            delete item.sender;
          }
          conversationData.push(item);
        }
        setConversations(conversationData);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // const res = await axios.get("http://localhost:9000/api/messages/" + currentChat?.id);
        const res = await messageNodeApi.getMessageById(currentChat?.id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    if (!newMessage) return e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversation_id: currentChat.id,
    };

    const aCurrentChatId = [currentChat?.sender_id, currentChat?.receiver_id];
    let receiverId = aCurrentChatId.find((member) => member !== user.id);
    debugger
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      // const res = await axios.post("http://localhost:9000/api/messages", message);
      const res = await messageNodeApi.createNewMessage(message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="search-container">
              <input
                placeholder="Search for friends"
                className="chatMenuInput"
              />
              <SearchOutlined className="search-icon" />
            </div>
            {conversations.map((item, id) => (
              <div onClick={() => setCurrentChat(item)}>
                <Conversation key={id} friend={item} current={currentChat} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Aa"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    <SendOutlined />
                  </button>
                </div>
              </>
            ) : (
              <div className="openConversation-container">
                <img
                  src={gif}
                  alt="background"
                  className="waiting-conversation"
                />
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
