import { auth } from "../fbconfig";
import "../Design/ChatMessage.css";
import {getFirestore, doc, deleteDoc} from "firebase/firestore";


export function ChatMessage({ message, fetchMessages }) {
  const { text, uid, photoURL, createdAt, id  } = message;
  const db = getFirestore();

  const removeMsg = () => {
    if (!id) {
      console.error('Cannot delete: No message ID provided');
      return;
    }
  
    const docRef = doc(db, 'messages', id);
    deleteDoc(docRef)
      .then(() => {
        console.log('Message successfully deleted:', id);
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
      fetchMessages();
  };
  

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const timestamp = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : "No timestamp";



  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
{" "}
      <p className="textDisplay">{text}</p>
      <span className="timestamp">{timestamp}</span>
      {messageClass === 'sent' && (
      <button onClick={removeMsg}>Radera</button>
    )}
    </div>
  );
}
