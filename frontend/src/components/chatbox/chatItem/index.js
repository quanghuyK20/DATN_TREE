import { useEffect, useState } from "react"

const ChatItem = ({ info, current }) => {
	return (
		<div className={info?.id === current?.id ? 'chat-item active' : 'chat-item'}>
			<div className="avatar">
				<img src={process.env.REACT_APP_API_URL + info.user.avatar} alt="User avatar" />
			</div>
			<div className="message-info">
				<h6 className="user-name">{info.user.name}</h6>
			</div>
		</div>
	)
}

export default ChatItem