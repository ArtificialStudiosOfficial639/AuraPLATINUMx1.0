
import React, { useEffect, useRef, useState } from "react";
import {
  ref,
  push,
  set,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

import { database } from "../Firebase/firebase";
import { useAuth } from "../context/AuthContext";
import "./styles/community.css";

function formatTime(timestamp) {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Community() {
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // Listen for live messages from Firebase
  useEffect(() => {
    const messagesQuery = query(
      ref(database, "community/messages"),
      orderByChild("createdAt"),
      limitToLast(100)
    );

    const unsubscribe = onValue(
      messagesQuery,
      (snapshot) => {
        const data = snapshot.val();

        const loadedMessages = data
          ? Object.entries(data).map(([id, value]) => ({
              id,
              ...value,
            }))
          : [];

        loadedMessages.sort(
          (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
        );

        setMessages(loadedMessages);
        setLoading(false);
        setError("");
      },
      (firebaseError) => {
        console.error("Community listener error:", firebaseError);
        setError("Unable to load messages. Check your database rules.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message to Firebase
  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || !user || sending) return;

    if (cleanMessage.length > 1000) {
      setError("Messages cannot exceed 1000 characters.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const messagesRef = ref(database, "community/messages");
      const newMessageRef = push(messagesRef);

      await set(newMessageRef, {
        uid: user.uid,
        username: user.displayName || "Student",
        text: cleanMessage,
        createdAt: Date.now(),
      });

      setMessage("");
    } catch (firebaseError) {
      console.error("Message sending failed:", firebaseError);
      setError("Message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Build a list of actual recent chat participants
  const participants = Object.values(
    messages.reduce((result, msg) => {
      if (msg.uid) {
        const previous = result[msg.uid];

        if (
          !previous ||
          (msg.createdAt || 0) > (previous.createdAt || 0)
        ) {
          result[msg.uid] = msg;
        }
      }

      return result;
    }, {})
  ).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <div className="community-page">
      {/* HEADER */}
      <header className="community-header">
        <div>
          <h1>Community <span>✦</span></h1>
          <p>Connect. Collaborate. Grow together.</p>
        </div>

        <div className="community-header-right">
          <span className="community-live-dot"></span>
          <span>Live Community</span>
          <div className="community-profile">
            {(user?.displayName || "S").charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="community-layout">
        {/* CHAT AREA */}
        <section className="community-chat">
          <div className="chat-topbar">
            <div className="chat-room-info">
              <div className="room-icon">🌐</div>
              <div>
                <h3>Global Community</h3>
                <p>Everyone on AURA</p>
              </div>
            </div>

            <div className="chat-top-actions">
              <button type="button" title="Live messages">●</button>
              <button type="button" title="Community">⋮</button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="community-messages">
            <div className="chat-date-divider">
              <span>Global Chat</span>
            </div>

            <div className="system-message community-welcome">
              ✨ Welcome to AURA Community! Connect, learn and grow together 🚀
            </div>

            {loading && (
              <p className="chat-status">Loading community messages...</p>
            )}

            {!loading && messages.length === 0 && (
              <div className="chat-empty">
                <span>💬</span>
                <h3>Start the conversation!</h3>
                <p>Be the first to send a message to the community.</p>
              </div>
            )}

            {messages.map((msg) => {
              const isMine = msg.uid === user?.uid;

              return (
                <div
                  key={msg.id}
                  className={`message-row ${isMine ? "mine" : "other"}`}
                >
                  {!isMine && (
                    <div className="message-avatar">
                      {(msg.username || "S").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="message-content">
                    {!isMine && (
                      <span className="message-sender">
                        {msg.username || "Student"}
                      </span>
                    )}

                    <div className="message-bubble">
                      {msg.text}
                    </div>

                    <span className="message-time">
                      {formatTime(msg.createdAt)}
                      {isMine ? " · You" : ""}
                    </span>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* ERROR */}
          {error && (
            <p className="chat-error" role="alert">
              {error}
            </p>
          )}

          {/* MESSAGE INPUT */}
          <form className="community-input-area" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Write a message to the community..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              disabled={sending || !user}
            />

            <button
              type="submit"
              className="send-message-btn"
              disabled={!message.trim() || sending || !user}
              aria-label="Send message"
            >
              {sending ? "…" : "➤"}
            </button>
          </form>
        </section>

        {/* REAL PARTICIPANTS SIDEBAR */}
        <aside className="community-members">
          <div className="members-heading">
            <h3>Participants</h3>
            <span>{participants.length}</span>
          </div>

          <div className="members-search">
            <input
              type="text"
              value="Global chat"
              readOnly
              aria-label="Current chat room"
            />
          </div>

          <div className="online-heading">
            RECENT PARTICIPANTS
          </div>

          {participants.length === 0 && (
            <p className="chat-status">
              No participants yet. Start chatting!
            </p>
          )}

          {participants.map((participant) => {
            const isMe = participant.uid === user?.uid;
            const name = participant.username || "Student";

            return (
              <div className="member-item" key={participant.uid}>
                <div className="member-avatar">
                  {name.charAt(0).toUpperCase()}
                  {isMe && <span className="online-indicator"></span>}
                </div>

                <div>
                  <h4>{isMe ? `${name} (You)` : name}</h4>
                  <p>{isMe ? "Your account" : "Recently active"}</p>
                </div>
              </div>
            );
          })}

          <div className="community-info-card">
            <span>🚀</span>
            <h4>Grow together</h4>
            <p>
              Share ideas, ask questions and help other students succeed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Community;
