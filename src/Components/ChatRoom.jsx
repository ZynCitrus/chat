import React, { useRef, useState } from 'react';
import '../Design/ChatRoom.css'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp,  } from 'firebase/firestore';
import {auth, app } from '../fbconfig'

import { ChatMessage } from './ChatMessage';
const firestore = getFirestore(app);

export function ChatRoom() {
  const dummy = useRef()
  const messageRef = collection(firestore, 'messages');
  const q = query(messageRef, orderBy('createdAt', 'desc'), limit(25));

  const [messages, loading, error] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

const sendMessage = async (e) => {
  e.preventDefault();

  if (!formValue.trim()) {
    console.error("Cannot send an empty message");
    return;
  }

  const { uid, photoURL, displayName } = auth.currentUser;

  try {
    await addDoc(messageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || 'fallback-image-url.png',
      displayName
    });
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error("Error writing message to Firestore:", error);
  }
};
  


  return (
    <>
  <main>
    {messages && messages.length > 0 ? (
      messages
        .slice()
        .reverse()
        .map((msg) => <ChatMessage key={msg.id} message={msg} />)
    ) : (
      <p>Inga meddelanden i chatten</p>
    )}
  </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">SKICKA</button>
      </form>
    </>
  );
}
