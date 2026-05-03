import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { FiAlertCircle, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

// Gmail Theme Colors
const COLORS = ['#ea4335', '#202124', '#5f6368', '#dadce0', '#f1f3f4'];

export default function AnalyticsDashboard({ emails, stats, onSelectEmail }) {
  const [showUrgentList, setShowUrgentList] = useState(false);

  const urgentEmails = useMemo(() => emails.filter(e => e.priority === 'urgent'), [emails]);

  const categoryData = useMemo(() => {
    const counts = {};
    emails.forEach(email => {
      const cat = email.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [emails]);

  const priorityData = useMemo(() => {
    const urgent = urgentEmails.length;
    const normal = emails.length - urgent;
    return [
      { name: 'Urgent', count: urgent },
      { name: 'Normal', count: normal }
    ];
  }, [emails, urgentEmails]);

  const timeSeriesData = useMemo(() => [
    { day: 'Mon', emails: 42 },
    { day: 'Tue', emails: 58 },
    { day: 'Wed', emails: 45 },
    { day: 'Thu', emails: 60 },
    { day: 'Fri', emails: 55 },
    { day: 'Sat', emails: 20 },
    { day: 'Sun', emails: 15 },
  ], []);

  return (
    <div className="analytics-dashboard" style={{ padding: '32px', flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>Analytics Overview</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowUrgentList(!showUrgentList)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: showUrgentList ? 'var(--accent-red)' : 'var(--bg-card)',
              color: showUrgentList ? 'white' : 'var(--accent-red)',
              border: `1px solid ${showUrgentList ? 'var(--accent-red)' : 'var(--accent-red)'}`,
              borderRadius: '24px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s',
              boxShadow: showUrgentList ? '0 4px 12px rgba(234, 67, 53, 0.2)' : 'none'
            }}
          >
            <FiAlertCircle />
            Urgent Emails ({urgentEmails.length})
            {showUrgentList ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {showUrgentList && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '12px', 
          marginBottom: '32px',
          overflow: 'hidden',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(234, 67, 53, 0.05)' }}>
            <span style={{ fontWeight: '600', color: 'var(--accent-red)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action Required: Urgent Priority</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{urgentEmails.length} messages needing immediate attention</span>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {urgentEmails.length > 0 ? urgentEmails.map(email => (
              <div 
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                style={{ 
                  padding: '16px 24px', 
                  borderBottom: '1px solid var(--border-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--accent-red)', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {email.avatar || email.from[0]}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{email.from}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email.subject}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{email.timestamp}</span>
                  <FiExternalLink style={{ color: 'var(--text-secondary)' }} />
                </div>
              </div>
            )) : (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No urgent emails at the moment.
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Emails</span>
          <span style={{ fontSize: '32px', fontWeight: '500', color: 'var(--text-primary)' }}>{stats.total}</span>
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Unread Emails</span>
          <span style={{ fontSize: '32px', fontWeight: '500', color: 'var(--text-primary)' }}>{stats.unread}</span>
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Urgent Priority</span>
          <span style={{ fontSize: '32px', fontWeight: '500', color: 'var(--accent-red)' }}>{stats.urgent}</span>
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Automation Rate</span>
          <span style={{ fontSize: '32px', fontWeight: '500', color: '#10b981' }}>85%</span>
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Avg Response Time</span>
          <span style={{ fontSize: '32px', fontWeight: '500', color: 'var(--text-primary)' }}>12m</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Area Chart: Emails Over Time */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '24px' }}>Email Volume (Last 7 Days)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="emails" stroke="#4285F4" fillOpacity={1} fill="url(#colorEmails)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Pie Chart: Email Categories */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '24px' }}>Emails by Category</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Priority Breakdown */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '24px' }}>Priority Breakdown</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priorityData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px' }}
                   cursor={{fill: 'var(--hover-bg)'}}
                />
                <Bar dataKey="count" fill="var(--accent-red)" radius={[4, 4, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
