import {auth } from '../fbconfig'
import '../Design/ChatMessage.css'

export function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const timestamp = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : "No timestamp";

    console.log("Rendering message:", props.message);


  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
      <p>{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
}