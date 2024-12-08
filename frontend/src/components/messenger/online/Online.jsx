import "./online.css";
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'

export default function Online({user}) {

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" 
            src={user ?  process.env.REACT_APP_API_URL + user.avatar : process.env.REACT_APP_API_URL + defaultImageUrl.USER_AVATAR} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.name}</span>
    </li>
  );
}