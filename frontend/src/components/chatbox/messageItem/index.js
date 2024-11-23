import { useEffect, useState } from "react"
import Moment from 'react-moment'
import { LoadingOutlined } from '@ant-design/icons'


const MessageItem = ({ message, userID }) => {
	const [id, setID] = useState(null)
	const [showDateSeparator, setShowDateSeparator] = useState(false)
	useEffect(() => {

	}, [])
	return (
		<>
			{/* {showDateSeparator && (
				<div className="date-separator">
					<Moment format="MMMM DD, YYYY">{message.createdAt}</Moment>
				</div>
			)} */}
			{message?.status === 'generating' ? (
				<li className={message.sender === userID ? 'message-item sent' : 'message-item received'}>
					<div className="message-content">
						<img src={process.env.REACT_APP_API_URL + message?.user?.avatar} alt="User avatar" />
						<p>
							<LoadingOutlined />
						</p>
					</div>
				</li>
			) : (
				<li className={message.sender === userID ? 'message-item sent' : 'message-item received'}>
					<div className="message-content">
						<img src={process.env.REACT_APP_API_URL + message?.user?.avatar} alt="User avatar" />
						<p>{message.text}</p>
					</div>
					<time className="message-time">
						<Moment format="hh:mm A">{message.createdAt}</Moment>
					</time>
				</li>
			)}
		</>
	)
}

export default MessageItem