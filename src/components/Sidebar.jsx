import { categories } from '../data/mockEmails';
import { HiOutlineInbox, HiOutlinePaperAirplane, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineCog, HiOutlineLogout, HiPencilAlt } from 'react-icons/hi';
import { getTagColor } from '../utils/aiSimulator';

export default function Sidebar({ user, filter, onFilterChange, view, onViewChange, onLogout, stats }) {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo" style={{ color: 'var(--accent-red)', fontSize: '28px', fontWeight: 'bold', marginRight: '4px' }}>M</div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 500 }}>Mail</h3>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginBottom: '16px' }}>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}
          onClick={() => onViewChange('compose')}
        >
          <HiPencilAlt style={{ fontSize: '18px' }} /> Compose
        </button>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-title">Overview</div>
        <div 
          className={`nav-item ${view === 'inbox' && filter === 'All Emails' ? 'active' : ''}`} 
          onClick={() => { onViewChange('inbox'); onFilterChange('All Emails'); }}
        >
          <span className="icon"><HiOutlineInbox /></span>
          Inbox
          <span className="badge">{stats.unread}</span>
        </div>
        <div 
          className={`nav-item ${view === 'sent' ? 'active' : ''}`} 
          onClick={() => onViewChange('sent')}
        >
          <span className="icon"><HiOutlinePaperAirplane /></span>
          Sent
        </div>
        <div 
          className={`nav-item ${view === 'drafts' ? 'active' : ''}`} 
          onClick={() => onViewChange('drafts')}
        >
          <span className="icon"><HiOutlineDocumentText /></span>
          Drafts
        </div>

        <div className="nav-section-title">AI Categories</div>
        {categories.slice(1).map(cat => {
          const { bg, text } = getTagColor(cat.name);
          return (
            <div key={cat.name}
              className={`nav-item ${view === 'inbox' && filter === cat.name ? 'active' : ''}`}
              onClick={() => { onViewChange('inbox'); onFilterChange(cat.name); }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: (view === 'inbox' && filter === cat.name) ? text : bg, display: 'inline-block', flexShrink: 0
              }} />
              {cat.name}
              <span className="badge" style={{
                background: (view === 'inbox' && filter === cat.name) ? '#fce8e6' : '#f1f3f4', color: (view === 'inbox' && filter === cat.name) ? '#d93025' : '#5f6368'
              }}>{cat.count}</span>
            </div>
          );
        })}

        <div className="nav-section-title" style={{ marginTop: 12 }}>System</div>
        <div 
          className={`nav-item ${view === 'analytics' ? 'active' : ''}`} 
          onClick={() => onViewChange('analytics')}
        >
          <span className="icon"><HiOutlineChartBar /></span>
          Analytics
        </div>
        <div className="nav-item">
          <span className="icon"><HiOutlineCog /></span>
          Settings
        </div>
        <div className="nav-item" onClick={onLogout} style={{ color: '#ef4444' }}>
          <span className="icon"><HiOutlineLogout /></span>
          Sign Out
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{user?.initials || 'U'}</div>
        <div className="user-info">
          <div className="name">{user?.name || 'User'}</div>
          <div className="email-addr">{user?.email || ''}</div>
        </div>
      </div>
    </div>
  );
}
