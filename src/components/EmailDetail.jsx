import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTagColor, getPriorityColor, getSentimentIcon } from '../utils/aiSimulator';
import { HiOutlineSparkles, HiOutlineRefresh, HiOutlinePaperAirplane, HiOutlinePencil, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const avatarColors = [
  '#ea4335', '#202124', '#5f6368', '#3c4043', '#000000', '#d93025'
];
function getAvatarColor(name) {
  if (!name) return '#000';
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

export default function EmailDetail({ email, onSend, isSent, view }) {
  const [showInsights, setShowInsights] = useState(true);
  const [draftText, setDraftText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (email && view === 'inbox') {
      setAiLoading(true);
      setDraftText('');
      setIsEditing(false);
      setShowSent(false);
      const t = setTimeout(() => {
        setDraftText(email.draftReply || '');
        setAiLoading(false);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [email?.id, view]);

  if (!email) {
    return (
      <div className="email-detail-panel">
        <div className="email-detail-empty">
          <div className="icon">📬</div>
          <p>Select an email to view details</p>
          {view === 'inbox' && <p style={{ fontSize: 13, color: '#475569' }}>AI will analyze and draft a reply automatically</p>}
        </div>
      </div>
    );
  }

  const tagColor = getTagColor(email.category);

  const handleSend = () => {
    setShowSent(true);
    onSend(email.id);
    setTimeout(() => setShowSent(false), 2500);
  };

  const handleRegenerate = () => {
    setAiLoading(true);
    setDraftText('');
    setTimeout(() => {
      setDraftText(email.draftReply || '');
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="email-detail-panel">
      <motion.div key={email.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <div className="email-detail-header">
          <div style={{ flex: 1 }}>
            <div className="email-detail-subject">{email.subject}</div>
            <div className="email-detail-meta">
              <div className="email-detail-avatar" style={{ background: getAvatarColor(email.from) }}>
                {email.avatar || email.from.charAt(0)}
              </div>
              <div>
                <div className="email-detail-from">{email.from}</div>
                <div className="email-detail-email">{email.email || ''}</div>
              </div>
              <span className="email-detail-timestamp" style={{ marginLeft: 16 }}>{email.timestamp}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 4 }}>
            <span className="email-tag" style={{
              background: '#f1f3f4', color: '#202124', borderColor: '#dadce0',
              fontSize: 12, padding: '4px 14px'
            }}>{email.category}</span>
          </div>
        </div>

        {/* Stats bar */}
        {view === 'inbox' && (
          <div className="stats-bar">
            <div className="stat-item">
              <span>🎯 Confidence</span>
              <span className="stat-value">{email.confidence}%</span>
            </div>
            {email.sentiment && (
              <div className="stat-item">
                <span>{getSentimentIcon(email.sentiment)} Sentiment</span>
                <span className="stat-value" style={{ textTransform: 'capitalize' }}>{email.sentiment}</span>
              </div>
            )}
            {email.priority && (
              <div className="stat-item">
                <span>⚡ Priority</span>
                <span className="stat-value" style={{ color: email.priority === 'urgent' ? 'var(--accent-red)' : '#5f6368', textTransform: 'capitalize' }}>
                  {email.priority}
                </span>
              </div>
            )}
            {isSent && (
              <div className="stat-item" style={{ marginLeft: 'auto' }}>
                <span className="stat-value" style={{ color: '#10b981' }}>✓ Reply Sent</span>
              </div>
            )}
          </div>
        )}

        {/* Email Body */}
        <div className="email-detail-body" style={{ whiteSpace: 'pre-wrap' }}>{email.body}</div>

        {/* AI Section - Only show if in inbox view */}
        {view === 'inbox' && email.entities && (
          <div className="ai-section">
            <div className="ai-section-header" onClick={() => setShowInsights(!showInsights)}>
              <span className="ai-badge">AI</span>
              <h3>AI Analysis & Draft Reply</h3>
              <span className="toggle">{showInsights ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}</span>
            </div>

            <AnimatePresence>
              {showInsights && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}>

                  {/* Insights Grid */}
                  <div className="ai-insights">
                    <div className="insight-card">
                      <div className="insight-label">Category</div>
                      <div className="insight-value">
                        <span className="email-tag" style={{
                          background: '#f1f3f4', color: '#202124', borderColor: '#dadce0'
                        }}>{email.category}</span>
                      </div>
                      <div className="confidence-bar">
                        <motion.div className="confidence-fill"
                          style={{ background: 'var(--accent-red)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${email.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3 }} />
                      </div>
                    </div>

                    {email.sentiment && (
                      <div className="insight-card">
                        <div className="insight-label">Sentiment</div>
                        <div className="insight-value">
                          <span style={{ fontSize: 20 }}>{getSentimentIcon(email.sentiment)}</span>
                          <span style={{ textTransform: 'capitalize' }}>{email.sentiment}</span>
                        </div>
                      </div>
                    )}

                    {email.entities && (
                      <div className="insight-card" style={{ gridColumn: '1 / -1' }}>
                        <div className="insight-label">Key Entities Detected</div>
                        <div className="entities-list">
                          {email.entities.map((e, i) => (
                            <motion.span key={i} className="entity-chip"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}>
                              {e}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Draft Reply */}
                  <div className="draft-section" style={{ marginTop: '24px', padding: '20px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div className="draft-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontSize: '16px', fontWeight: '500' }}>
                        <HiOutlineSparkles style={{ color: 'var(--accent-red)', fontSize: '20px' }} /> 
                        AI-Generated Draft Reply
                      </h4>
                      <div className="draft-actions" style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={handleRegenerate} disabled={aiLoading} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '13px' }}>
                          <HiOutlineRefresh style={{ fontSize: '16px' }} /> Regenerate
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(!isEditing)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '13px' }}>
                          <HiOutlinePencil style={{ fontSize: '16px' }} /> {isEditing ? 'Preview' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {aiLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                        <div className="shimmer" style={{ height: '14px', width: '90%', borderRadius: '4px' }} />
                        <div className="shimmer" style={{ height: '14px', width: '75%', borderRadius: '4px' }} />
                        <div className="shimmer" style={{ height: '14px', width: '85%', borderRadius: '4px' }} />
                        <div className="shimmer" style={{ height: '14px', width: '60%', borderRadius: '4px' }} />
                        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }} className="pulse">
                          🤖 AI is composing a thoughtful response...
                        </p>
                      </div>
                    ) : isEditing ? (
                      <textarea 
                        className="draft-textarea" 
                        value={draftText}
                        onChange={e => setDraftText(e.target.value)} 
                        style={{ width: '100%', minHeight: '160px', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.6', outline: 'none', resize: 'vertical' }}
                      />
                    ) : (
                      <motion.div 
                        className="draft-textarea" 
                        style={{
                          cursor: 'default', whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '300px',
                          padding: '16px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px',
                          border: '1px solid var(--border-color)', fontSize: '15px', lineHeight: '1.6', color: 'var(--text-primary)'
                        }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                      >
                        {draftText}
                      </motion.div>
                    )}

                    {!aiLoading && (
                      <div className="draft-buttons" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        {isSent ? (
                          <button className="btn btn-success" disabled style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
                            ✓ Reply Sent Successfully
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={handleSend} style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <HiOutlinePaperAirplane style={{ fontSize: '18px' }} /> Approve & Send
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Sent Overlay */}
      <AnimatePresence>
        {showSent && (
          <motion.div className="sent-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="sent-card"
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }} transition={{ type: 'spring', damping: 15 }}>
              <div className="sent-check">✅</div>
              <h3>Reply Sent Successfully!</h3>
              <p>AI-generated reply has been sent to {email.from}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
