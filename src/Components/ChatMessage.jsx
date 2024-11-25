import {auth } from '../fbconfig'
import '../Design/ChatMessage.css'

export function ChatMessage(props) {
  const { text, uid, photoURL, createdAt, displayName } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const timestamp = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : "No timestamp";

  return (
    <div className={`message ${messageClass}`}>
{/*       <img src={photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
 */}      <p className='nameHolder'>{displayName}</p>
      <p>{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
}