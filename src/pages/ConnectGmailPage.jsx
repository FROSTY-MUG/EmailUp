import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { label: 'Authenticating with Google...', icon: '🔐' },
  { label: 'Connecting to Gmail inbox...', icon: '📬' },
  { label: 'Granting AI read permissions...', icon: '🤖' },
  { label: 'Scanning and categorizing emails...', icon: '🏷️' },
];

export default function ConnectGmailPage({ user, onConnected }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrentStep(i + 1), (i + 1) * 1100));
    });

    // Count up emails after step 3
    timers.push(setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        if (count >= 12) {
          count = 12;
          clearInterval(interval);
          setEmailCount(12);
          setDone(true);
          setTimeout(onConnected, 1800);
        } else {
          setEmailCount(count);
        }
      }, 80);
    }, 3800));

    return () => timers.forEach(clearTimeout);
  }, [onConnected]);

  return (
    <div className="connect-page">
      <motion.div className="connect-card"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        <motion.div className="connect-icon"
          style={{ background: done ? '#fce8e6' : '#f1f3f4' }}
          animate={done ? {} : { rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}>
          {done ? '✅' : '📧'}
        </motion.div>

        <h2>{done ? 'Gmail Connected!' : 'Connecting Gmail...'}</h2>
        <p>{done
          ? `Found ${emailCount} emails to process. Launching your AI-powered inbox...`
          : `Setting up AI automation for ${user?.email || 'your account'}`
        }</p>

        <div className="progress-bar">
          <motion.div className="progress-fill"
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }} />
        </div>

        <div className="connect-steps">
          {steps.map((step, i) => (
            <motion.div key={i}
              className={`connect-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}`}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}>
              <div className={`step-num ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}`}>
                {i < currentStep ? '✓' : step.icon}
              </div>
              <span style={{ color: i < currentStep ? 'var(--accent-red)' : i === currentStep ? '#f1f5f9' : '#64748b' }}>
                {step.label}
              </span>
              {i === currentStep && !done && <div className="spinner" style={{ marginLeft: 'auto' }} />}
            </motion.div>
          ))}
        </div>

        {currentStep >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="email-counter">{emailCount}</div>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>emails categorized by AI</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
