import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ref, push, onValue } from "firebase/database";

export default function AdminChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach((child) => {
        msgs.push({ id: child.key, ...child.val() });
      });
      msgs.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      sender: "admin",
      text,
      createdAt: Date.now()
    });

    setText("");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        height: "90vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily: "sans-serif",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0088cc",
          color: "#fff",
          padding: "12px 16px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        چت ادمین
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          backgroundColor: "#e5ddd5",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "admin" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "16px",
                backgroundColor:
                  msg.sender === "admin" ? "#dcf8c6" : "#fff",
                color: "#000",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                fontSize: "15px",
                lineHeight: "1.5",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="پیام خود را بنویسید..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 16px",
            backgroundColor: "#0088cc",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
