import React, { useState, useRef, useEffect } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { useTasks } from '../context/TaskContext';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'assistant',
    text: "Hello Ayu! I'm your AURA AI Study Assistant. I can help analyze your academic progress, suggest revision schedules, or break down difficult topics. What are we tackling today?",
    timestamp: 'Just now',
  },
];

function Assistant() {
  const { subjects, stats: academicStats } = useAcademic();
  const { tasks, stats: taskStats } = useTasks();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Context-aware dynamic shortcuts
  const lowestSubject = [...subjects].sort((a, b) => {
    const pctA = a.marksScored / a.totalMarks;
    const pctB = b.marksScored / b.totalMarks;
    return pctA - pctB;
  })[0];

  const shortcuts = [
    {
      id: 'analysis',
      label: '📊 Performance Review',
      prompt: `Analyze my academic standing. My average is ${academicStats.overallPercentage}% across ${academicStats.subjectCount} subjects.`,
    },
    {
      id: 'focus',
      label: lowestSubject ? `🎯 Improve ${lowestSubject.name}` : '🎯 Study Strategy',
      prompt: lowestSubject
        ? `I have ${lowestSubject.marksScored}/${lowestSubject.totalMarks} in ${lowestSubject.name}. Give me a 3-step strategy to reach my ${lowestSubject.targetPercentage}% target.`
        : 'Give me an active recall revision framework for middle school subjects.',
    },
    {
      id: 'tasks',
      label: `📝 Tasks Plan (${taskStats.pending} pending)`,
      prompt: `I have ${taskStats.pending} pending tasks left. How should I prioritize them to maximize focus?`,
    },
    {
      id: 'feynman',
      label: '🧠 Feynman Technique',
      prompt: 'Explain how I can use the Feynman Technique to study complex science and math formulas faster.',
    },
  ];

  // Simulated AI response generator based on query keywords
  const generateAssistantResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('performance') || query.includes('average')) {
      return `Your overall aggregate sits at ${academicStats.overallPercentage}%. You are tracking ${academicStats.subjectCount} subjects. To boost this further, prioritize weak topics with spaced repetition rather than passive rereading.`;
    }
    if (query.includes('strategy') || query.includes('target') || query.includes('improve')) {
      return lowestSubject
        ? `For ${lowestSubject.name}: \n1. Identify question patterns in tests where you lost marks.\n2. Work through 3-5 solved practice exercises daily without checking solutions first.\n3. Create 1-page formula or keyword summary sheets.`
        : `Focus on active retrieval: close your textbook and write down everything you remember on a blank page before reviewing notes.`;
    }
    if (query.includes('task') || query.includes('prioritize')) {
      return `You have ${taskStats.pending} pending tasks out of ${taskStats.total}. Apply the Eisenhower Matrix: complete high-priority assignments first, and tackle your toughest subject during your peak energy hours.`;
    }
    if (query.includes('feynman')) {
      return `The Feynman Technique consists of 4 steps:\n1. Choose a concept (e.g., Photosynthesis or Newton's Laws).\n2. Explain it in plain words as if teaching an 8-year-old.\n3. Identify gaps where you relied on jargon.\n4. Review your textbook and simplify again.`;
    }

    return `That's a great study inquiry. To master this effectively, break the concept into smaller sub-modules, use 25-minute Pomodoro focus blocks, and quiz yourself at the end of each session.`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI network response delay
    setTimeout(() => {
      const reply = generateAssistantResponse(query);
      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <main className="dashboard-content chat-page-layout">
      {/* Prompt Shortcuts Strip */}
      <div className="shortcuts-container">
        <span className="shortcuts-label">Contextual Prompts:</span>
        <div className="shortcuts-scroll">
          {shortcuts.map((sc) => (
            <button
              key={sc.id}
              type="button"
              className="shortcut-chip"
              onClick={() => handleSendMessage(sc.prompt)}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="chat-window">
        <div className="messages-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble-wrapper ${msg.sender === 'user' ? 'outgoing' : 'incoming'}`}
            >
              <div className="message-avatar">
                {msg.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble-wrapper incoming">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            placeholder="Ask AURA study assistant or request a revision schedule..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="btn-primary send-btn"
            disabled={!inputText.trim() || isTyping}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default Assistant;