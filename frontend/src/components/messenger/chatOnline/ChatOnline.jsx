import axios from "axios";
import { useEffect, useState } from "react";
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import "./ChatOnline.scss";
import nodeJSClient from "api/nodeJSClient";
import messageNodeApi from "api/messageNodeApi";
import followApi from "api/followApi";
import userApi from "api/userApi";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
        // có follow
        // const res = await axios.get(`http://localhost:8004/api/follows-by-user-id/${currentId}`);
        const res = await followApi.getFriends(currentId);
        console.log("res",res);
        setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends);
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      // const res = await axios.get("http://localhost:8004/api/users/" + user.id);
      const res = await userApi.getUserChatById(user.id);
      setCurrentChat(res.data);
      const conversation = {
        sender_id: currentId,
        receiver_id: user.id
      };
      // const conversations = await axios.post("http://localhost:9000/api/conversations", conversation);
      const conversations = await messageNodeApi.createNewConversation(conversation)
      console.log(conversations);
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o ?  process.env.REACT_APP_API_URL + o.store_avatar : process.env.REACT_APP_API_URL + defaultImageUrl.STORE_IMG
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.store_name}</span>
        </div>
      ))}
    </div>
  );
}