import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePaperAirplane, HiOutlineTrash, HiOutlineSparkles } from 'react-icons/hi';

const AI_SUGGESTIONS = [
  "I hope this email finds you well.",
  "Let me know if you need any further information.",
  "Looking forward to hearing from you soon.",
  "Thanks for reaching out.",
  "Please let me know your availability for a quick call.",
  "I have attached the requested documents.",
  "Could you please provide an update on this?",
  "Thank you for your time and consideration."
];

export default function ComposeEmail({ onSend, onDiscard, initialDraft = null, onSaveDraft }) {
  const [to, setTo] = useState(initialDraft?.to || '');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [subject, setSubject] = useState(initialDraft?.subject || '');
  const [body, setBody] = useState(initialDraft?.body || '');
  const [suggestion, setSuggestion] = useState('');
  const textareaRef = useRef(null);

  // Simple Smart Compose logic
  useEffect(() => {
    if (!body.trim()) {
      setSuggestion('');
      return;
    }

    const words = body.split(/\s+/);
    const lastWord = words[words.length - 1].toLowerCase();

    // Find a suggestion that might follow
    // In a real app, this would be an API call
    let found = '';
    if (body.endsWith(' ')) {
      // Find suggestion based on the last few words
      const matchingSuggest = AI_SUGGESTIONS.find(s => s.toLowerCase().startsWith(lastWord));
      if (matchingSuggest) {
        found = matchingSuggest;
      } else if (Math.random() > 0.7) {
        found = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
      }
    }
    
    setSuggestion(found);
  }, [body]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setBody(prev => prev + suggestion);
      setSuggestion('');
    }
  };

  const handleSend = () => {
    if (!to || !body) return;
    onSend({
      id: initialDraft?.id || Date.now().toString(),
      to,
      cc,
      bcc,
      subject,
      body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
    });
  };

  const handleDiscard = () => {
    if (to || subject || body) {
      onSaveDraft({
        id: initialDraft?.id || Date.now().toString(),
        to,
        cc,
        bcc,
        subject,
        body,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    onDiscard();
  };

  return (
    <div className="compose-panel">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="compose-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="compose-header" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500' }}>New Message</h2>
          <div className="compose-actions">
            <button className="btn-icon" onClick={handleDiscard}><HiOutlineTrash /></button>
          </div>
        </div>

        <div className="compose-field" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '60px', color: 'var(--text-secondary)' }}>To</label>
          <input type="email" value={to} onChange={e => setTo(e.target.value)} placeholder="recipient@example.com" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px' }} />
          <button 
            type="button" 
            onClick={() => setShowCcBcc(!showCcBcc)}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: '500', padding: '4px 8px' }}
          >
            Cc/Bcc
          </button>
        </div>
        
        <AnimatePresence>
          {showCcBcc && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
              <div className="compose-field" style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border-color)' }}>
                <label style={{ width: '60px', color: 'var(--text-secondary)' }}>Cc</label>
                <input type="email" value={cc} onChange={e => setCc(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px' }} />
              </div>
              <div className="compose-field" style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border-color)' }}>
                <label style={{ width: '60px', color: 'var(--text-secondary)' }}>Bcc</label>
                <input type="email" value={bcc} onChange={e => setBcc(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="compose-field" style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <label style={{ width: '60px', color: 'var(--text-secondary)' }}>Subject</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px' }} />
        </div>

        <div className="compose-body-wrapper" style={{ flex: 1, position: 'relative', marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
          <textarea
            ref={textareaRef}
            className="compose-textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your email here..."
            style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.6' }}
          />
          {suggestion && (
            <div className="smart-compose-suggestion" style={{ position: 'absolute', top: 0, left: 0, padding: '0', pointerEvents: 'none', fontSize: '15px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              <span style={{ visibility: 'hidden' }}>{body}</span>
              <span className="suggestion-text" style={{ color: '#9aa0a6' }}>{suggestion}</span>
              <span className="tab-hint" style={{ fontSize: '12px', marginLeft: '8px', background: '#f1f3f4', padding: '2px 6px', borderRadius: '4px' }}>Press Tab</span>
            </div>
          )}
          <div className="ai-compose-hint" style={{ marginTop: 'auto', padding: '12px 0', color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HiOutlineSparkles style={{ color: 'var(--accent-red)' }} /> AI Smart Compose is active. Start typing to see suggestions.
          </div>
        </div>

        <div className="compose-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <button className="btn btn-primary" onClick={handleSend} disabled={!to || !body} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }}>
            <HiOutlinePaperAirplane style={{ fontSize: '16px' }} /> Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
