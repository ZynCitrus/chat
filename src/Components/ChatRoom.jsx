import React, { useRef, useState, useEffect } from "react";
import "../Design/ChatRoom.css";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  getDocs
} from "firebase/firestore";
import { auth, app } from "../fbconfig";

import { ChatMessage } from "./ChatMessage";
const firestore = getFirestore(app);

export function ChatRoom() {
  const dummy = useRef(null); 
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

    const fetchMessages = async () => {
    const messageRef = collection(firestore, "messages");
    const q = query(messageRef, orderBy("createdAt", "desc"), limit(25));
    try {
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };
    loadMessages();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim()) {
      console.error("Cannot send an empty message");
      return;
    }

    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      await addDoc(collection(firestore, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL: photoURL || "fallback-image-url.png",
        displayName,
      });
      setFormValue("");
      fetchMessages(); 
      if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }
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
            .map((msg) =>       <ChatMessage key={msg.id} message={msg} fetchMessages={fetchMessages} />
          )
        ) : (
          <p>Inga meddelanden i chatten</p>
        )}
        <span ref={dummy}></span>
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

