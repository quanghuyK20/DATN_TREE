import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageOutlined, DownOutlined, RobotOutlined, ExportOutlined, DownloadOutlined, SearchOutlined, SendOutlined, MoreOutlined, AudioOutlined, PaperClipOutlined } from '@ant-design/icons'
import './chatbox.scss'
import ChatItem from './chatItem';
import MessageItem from './messageItem';
import useAuth from "hooks/useAuth";
import axios from 'axios'
import { io } from "socket.io-client";
import messageNodeApi from 'api/messageNodeApi';

function ChatBox() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [messagesChatBot, setMessagesChatBot] = useState([]);
  const inputRef = useRef(null);
  const messageBodyRef = useRef(null);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleSetCurrentChat = (itemChat) => {
    setCurrentChat(itemChat)
  }

  useEffect(() => {
    const aCurrentChatId = [currentChat?.sender_id, currentChat?.receiver_id];
    arrivalMessage &&
      aCurrentChatId?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        // const res = await axios.get('http://localhost:9000/api/messages/' + currentChat?.id)
        const res = await messageNodeApi.getMessageById(currentChat?.id);
        setMessages(res.data)
        console.log(res.data);
        if (messageBodyRef.current) {
          messageBodyRef.current.scrollTo(0, messageBodyRef.current.scrollHeight)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getUser()

  }, [currentChat])

  const handleSendMessage = async () => {
    debugger
    const messageText = inputRef.current.value
    if (messageText) {
      if (currentChat?.role === 'chatbot') {
        setMessagesChatBot([...messagesChatBot, {
          sender: user.id, text: messageText, user: {
            "name": user.name,
            "email": user.email,
            "avatar": user.avatar,
          }
        }])

        const options = {
          method: 'POST',
          url: 'https://chatgpt-open-ai-nlp.p.rapidapi.com/',
          // url: process.env.ChatbotURL,
          headers: {
            'content-type': 'application/json',
            Type: 'chatgpt4-chat',
            'X-RapidAPI-Key': 'a12e3cddd7mshae511e0a3cc36c5p17e4abjsnbc863e958866',
            // 'X-RapidAPI-Key': process.env.RapidAPIKey,
            'X-RapidAPI-Host': 'chatgpt-open-ai-nlp.p.rapidapi.com'
            // 'X-RapidAPI-Host': process.env.RapidAPIHost
          },
          data: {
            messages: [
              {
                role: 'user',
                content: messageText
              }
            ]
          }
        };

        try {
          inputRef.current.value = ''
          setMessagesChatBot([...messagesChatBot, {
            sender: user.id, text: messageText, user: {
              "name": user.name,
              "email": user.email,
              "avatar": user.avatar,
            }
          }, {
            sender: 0, text: '', status: 'generating', user: {
              "name": "Bonsai Da Nang",
              "avatar": user.avatar,
            }
          }])
          const response = await axios.request(options);
          setMessagesChatBot([...messagesChatBot, {
            sender: user.id, text: messageText, user: {
              "name": user.name,
              "email": user.email,
              "avatar": user.avatar,
            }
          }, {
            sender: 0, text: response.data.content, user: {
              "name": "Bonsai Da Nang",
              "avatar": user.avatar,
            }
          }])
        } catch (error) {
          setMessagesChatBot([...messagesChatBot, {
            sender: user.id, text: messageText, user: {
              "name": user.name,
              "email": user.email,
              "avatar": user.avatar,
            }
          }, {
            sender: 0, text: error.message, user: {
              "name": "Bonsai Da Nang",
              "avatar": user.avatar,
            }
          }])
        }
      } else {
        const payload = { conversation_id: currentChat.id, sender: user.id, text: messageText };
        const aCurrentChatId = [currentChat?.sender_id, currentChat?.receiver_id]
        let receiverId = aCurrentChatId.find(member => member !== user.id);

        socket.current.emit("sendMessage", {
          senderId: user.id,
          receiverId: receiverId,
          text: messageText,
        });

        try {
          // await axios.post('http://localhost:9000/api/messages', payload)
          const res = await messageNodeApi.createNewMessage(payload);
          inputRef.current.value = ''
          // const res = await axios.get('http://localhost:9000/api/messages/' + currentChat?.id)
          // const res = await messageNodeApi.getMessageById(currentChat?.id)
          // setMessages(res.data)
          setMessages([...messages, res.data]);
        } catch (err) {
          console.log(err)
        }
      }
      if (messageBodyRef.current) {
        messageBodyRef.current.scrollTo(0, messageBodyRef.current.scrollHeight)
      }
    }
  }

  const handleGetChatBotConversation = () => {
    setMessages(messagesChatBot)
    setCurrentChat({
      user: {
        name: "Bonsai Da Nang",
        avatar: 'images/logo/avatar.png'
      },
      role: 'chatbot'
    })
  }

  useEffect(() => {
    const getConversations = async () => {
      try {
        // const res = await axios.get("http://localhost:9000/api/conversations/" + user.id);
        const res = await messageNodeApi.getConversationById(user.id);
        const conversationData = [];
        for (const item of res.data) {
          const senderId = item.sender.id;
          if (senderId === user.id) {
            delete item.sender
            item.user = item.receiver
            delete item.receiver
          } else {
            delete item.receiver
            item.user = item.sender
            delete item.sender
          }
          conversationData.push(item)
        }
        setConversations(conversationData);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  return (
    <div>
      {
        isOpen === true ? (
          <div className="chat">
            {/* <Bubbles close={setIsOpen} listCircle={list} setListCircle={handleOpenConversation} /> */}
            <div className="conversation-container">
              <div className="message-header">
                <div className="title">Chat</div>
                <div className="toolbar">
                  <ExportOutlined className="icon-collapse" />
                  <DownloadOutlined className="icon-close" onClick={() => setIsOpen(false)} />
                </div>
              </div>
              <div className="content">
                <div className="message-list-container">
                  <div className="tool-search">
                    <div className="search">
                      <SearchOutlined className="icon-search" />
                      <input placeholder='Tìm kiếm' />
                    </div>
                    <div className="filters">
                      <span>Tất cả</span>
                      <DownOutlined className="icon-down" />
                    </div>
                  </div>
                  <div className="message-list">
                    {conversations.map((item, id) => {
                      return (
                        <div onClick={() => handleSetCurrentChat(item)}>
                          <ChatItem key={id} info={item} current={currentChat} />
                        </div>
                      )
                    })}
                  </div>
                  <div className='chatbot-container' onClick={handleGetChatBotConversation}>
                    <RobotOutlined className='icon' />
                    <span>Chatbot</span>
                  </div>
                </div>
                <div className="message-content">
                  <div className="chat-header">
                    <div className="avatar">
                      <img src={currentChat && process.env.REACT_APP_API_URL + currentChat.user.avatar} alt="User avatar" />
                    </div>
                    <div className="user-info">
                      <h6 className="user-name">{currentChat && currentChat.user.name}</h6>
                      <span className="user-status">
                        <span className="store-home__shop__active__icon"></span>
                        Active now </span>
                    </div>
                  </div>
                  <div className="chat-body" ref={messageBodyRef}>
                    <ul className="message-list">
                      {
                        currentChat?.role === 'chatbot' ? (
                          messagesChatBot.map((message, id) => {
                            return (
                              <MessageItem key={`chatbot_${id}`} message={message} userID={user.id} />
                            )
                          })
                        ) :
                          messages?.map((message, id) => {
                            return (
                              <MessageItem key={id} message={message} userID={user.id} />
                            )
                          })}
                    </ul>
                  </div>
                  <div className="chat-footer">
                    <div className="chat-toolbar">
                      <PaperClipOutlined className="attachment icon" />
                      <AudioOutlined className="audio icon" />
                      <MoreOutlined className="more icon" />
                    </div>
                    <input placeholder="Type a message" ref={inputRef} />
                    <div className="chat-send icon" onClick={handleSendMessage}>
                      <SendOutlined />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        ) : (
          <div className="fixed-bottom fixed-right chatbox-container">
            <div className="container">
              <div className="d-flex justify-content-end">
                <button className="btn btn-chatbox d-flex" onClick={(e) => setIsOpen(true)}>
                  <MessageOutlined className='chatbox-container__icon' />
                  Chat
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ChatBox;