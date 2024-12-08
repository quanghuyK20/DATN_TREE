import { format } from "timeago.js";
import "./Message.scss"

export default function Message({ message, own }) {
  console.log("Message", message, own);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ message.user ?  process.env.REACT_APP_API_URL + message.user.avatar : ""}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}