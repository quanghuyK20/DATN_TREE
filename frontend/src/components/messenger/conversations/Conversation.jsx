import axios from "axios";
import { useEffect, useState } from "react";
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import "./Conversation.scss";

export default function Conversation({ friend, current }) {
  console.log("item",friend);
  console.log("current",current);
  return (
    <div className={friend?.user.id === current?.id ? 'conversation active' : 'conversation'}>
      <img
        className="conversationImg"
        src={
          friend ?  process.env.REACT_APP_API_URL + friend?.user?.avatar : process.env.REACT_APP_API_URL + defaultImageUrl.USER_AVATAR
        }
        alt=""
      />
      <span className="conversationName">{friend?.user?.name}</span>
    </div>
  );
}