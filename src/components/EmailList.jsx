import { motion } from 'framer-motion';
import { HiOutlineSearch } from 'react-icons/hi';
import { getTagColor, getPriorityColor } from '../utils/aiSimulator';
import { categories } from '../data/mockEmails';

const avatarColors = [
  '#ea4335', '#202124', '#5f6368', '#3c4043', '#000000', '#d93025'
];

function getAvatarColor(name) {
  if (!name) return '#000';
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

export default function EmailList({ emails, selectedId, onSelect, filter, onFilterChange, search, onSearchChange, readEmails, sentEmails, view }) {
  const title = view === 'inbox' ? 'Inbox' :
                view === 'sent' ? 'Sent Mails' :
                view === 'drafts' ? 'Drafts' : 'Compose';

  return (
    <div className="email-list-panel">
      <div className="email-list-header">
        <h2>{title}</h2>
        <span className="email-count">{emails.length} conversations {view === 'inbox' && '• AI categorized'}</span>
      </div>

      {view !== 'compose' && (
        <div className="search-wrapper">
          <HiOutlineSearch className="search-icon" />
          <input className="email-search" placeholder="Search emails, categories, senders..."
            value={search} onChange={e => onSearchChange(e.target.value)} />
        </div>
      )}

      {view !== 'compose' && (
        <div className="email-list">
          {emails.map((email, i) => {
            const tagColor = getTagColor(email.category);
            const isRead = email.read || readEmails.has(email.id);
            const isSent = view === 'sent' || sentEmails.includes(email.id);

            return (
              <motion.div key={email.id}
                className={`email-item ${selectedId === email.id ? 'active' : ''} ${!isRead && view === 'inbox' ? 'unread' : ''}`}
                onClick={() => onSelect(email.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}>

                <div className="email-item-top">
                  {!isRead && view === 'inbox' && <div className="unread-dot" />}
                  <div className="email-avatar" style={{ background: getAvatarColor(email.from) }}>
                    {email.avatar || email.from.charAt(0)}
                  </div>
                  <span className="email-sender">{email.from}</span>
                  <span className="email-time">{email.timestamp}</span>
                </div>

                <div className="email-subject">{email.subject}</div>

                <div className="email-tags">
                  <span className="email-tag" style={{
                    background: '#f1f3f4', color: '#202124', borderColor: '#dadce0'
                  }}>
                    {email.category}
                  </span>
                  <div className="priority-dot" style={{ background: email.priority === 'urgent' ? 'var(--accent-red)' : '#dadce0' }} />
                  {view === 'inbox' && <span style={{ fontSize: 11, color: '#64748b' }}>{email.confidence}% match</span>}
                  {isSent && view === 'inbox' && <span style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600 }}>✓ Replied</span>}
                </div>
              </motion.div>
            );
          })}

          {emails.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontSize: 32, marginBottom: 8 }}>{view === 'drafts' ? '📝' : view === 'sent' ? '📤' : '🔍'}</p>
              <p>{view === 'drafts' ? 'No drafts saved' : view === 'sent' ? 'No sent emails' : 'No emails match your search'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
