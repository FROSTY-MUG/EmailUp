import { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmailList from '../components/EmailList';
import EmailDetail from '../components/EmailDetail';
import ComposeEmail from '../components/ComposeEmail';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { mockEmails } from '../data/mockEmails';

export default function InboxPage({ user, onLogout }) {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('All Emails');
  const [view, setView] = useState('inbox'); // 'inbox', 'sent', 'drafts', 'compose'
  const [search, setSearch] = useState('');
  
  // Local storage persistence
  const [sentEmails, setSentEmails] = useState(() => JSON.parse(localStorage.getItem('sentEmails') || '[]'));
  const [readEmails, setReadEmails] = useState(() => new Set(JSON.parse(localStorage.getItem('readEmails') || '[]')));
  const [drafts, setDrafts] = useState(() => JSON.parse(localStorage.getItem('drafts') || '[]'));
  const [customSent, setCustomSent] = useState(() => JSON.parse(localStorage.getItem('customSent') || '[]'));

  useEffect(() => { localStorage.setItem('sentEmails', JSON.stringify(sentEmails)); }, [sentEmails]);
  useEffect(() => { localStorage.setItem('readEmails', JSON.stringify([...readEmails])); }, [readEmails]);
  useEffect(() => { localStorage.setItem('drafts', JSON.stringify(drafts)); }, [drafts]);
  useEffect(() => { localStorage.setItem('customSent', JSON.stringify(customSent)); }, [customSent]);

  const filteredEmails = useMemo(() => {
    let list = [];
    if (view === 'inbox') {
      list = mockEmails;
      if (filter !== 'All Emails') {
        list = list.filter(e => e.category === filter);
      }
    } else if (view === 'sent') {
      list = mockEmails.filter(e => sentEmails.includes(e.id)).concat(customSent.map(cs => ({
        id: cs.id,
        from: user?.name || 'Aryan Arora',
        subject: cs.subject,
        body: cs.body,
        category: 'Custom Sent',
        timestamp: cs.timestamp,
        avatar: 'AA',
        read: true,
        priority: 'normal',
        confidence: 100,
      })));
    } else if (view === 'drafts') {
      list = drafts.map(d => ({
        id: d.id,
        from: 'Draft',
        subject: d.subject || '(No Subject)',
        body: d.body,
        category: 'Draft',
        timestamp: d.timestamp,
        avatar: 'D',
        read: true,
        priority: 'normal',
        confidence: 0,
      }));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.subject?.toLowerCase().includes(q) ||
        e.from?.toLowerCase().includes(q) ||
        e.body?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [view, filter, search, sentEmails, drafts, customSent, user]);

  const selectedEmail = useMemo(() => {
    if (view === 'inbox') return mockEmails.find(e => e.id === selectedId);
    if (view === 'sent') return filteredEmails.find(e => e.id === selectedId);
    if (view === 'drafts') return drafts.find(e => e.id === selectedId);
    return null;
  }, [view, selectedId, filteredEmails, drafts]);

  const handleSelect = (id) => {
    setSelectedId(id);
    if (view === 'inbox') {
      setReadEmails(prev => new Set([...prev, id]));
    }
  };

  const handleSendReply = (id) => {
    if (view === 'inbox') {
      setSentEmails(prev => [...prev, id]);
    }
  };

  const handleSendCompose = (email) => {
    setCustomSent(prev => [email, ...prev]);
    setDrafts(prev => prev.filter(d => d.id !== email.id)); // remove from drafts if any
    setView('inbox');
  };

  const handleSaveDraft = (draft) => {
    setDrafts(prev => {
      const existing = prev.find(d => d.id === draft.id);
      if (existing) return prev.map(d => d.id === draft.id ? draft : d);
      return [draft, ...prev];
    });
  };

  const handleDiscardCompose = () => {
    setView('inbox');
  };

  const stats = {
    total: mockEmails.length,
    urgent: mockEmails.filter(e => e.priority === 'urgent').length,
    unread: mockEmails.filter(e => !e.read && !readEmails.has(e.id)).length,
    avgConfidence: Math.round(mockEmails.reduce((s, e) => s + e.confidence, 0) / mockEmails.length),
  };

  return (
    <div className="inbox-layout">
      <Sidebar 
        user={user} 
        filter={filter} 
        onFilterChange={setFilter} 
        view={view}
        onViewChange={(newView) => { setView(newView); setSelectedId(null); setSearch(''); }}
        onLogout={onLogout} 
        stats={stats} 
      />
      {view === 'analytics' ? (
        <AnalyticsDashboard 
          emails={mockEmails} 
          stats={stats} 
          onSelectEmail={(id) => {
            setView('inbox');
            setSelectedId(id);
            setFilter('All Emails');
            setSearch('');
          }}
        />
      ) : (
        <>
          <EmailList
            emails={filteredEmails}
            selectedId={selectedId}
            onSelect={handleSelect}
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
            readEmails={readEmails}
            sentEmails={sentEmails}
            view={view}
          />
          {view === 'compose' || (view === 'drafts' && selectedId) ? (
            <ComposeEmail 
              onSend={handleSendCompose} 
              onDiscard={handleDiscardCompose}
              onSaveDraft={handleSaveDraft}
              initialDraft={view === 'drafts' ? selectedEmail : null}
              key={selectedId || 'new'}
            />
          ) : (
            <EmailDetail
              email={selectedEmail}
              onSend={handleSendReply}
              isSent={selectedEmail ? (view === 'sent' || sentEmails.includes(selectedEmail.id)) : false}
              view={view}
            />
          )}
        </>
      )}
    </div>
  );
}
