'use client';

import { useEffect, useState } from 'react';
import styles from './RecentFeed.module.css';

export default function RecentFeed() {
  const [recent, setRecent] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setTotal(data.total || 0);
        setRecent(data.recent || []);
      } catch {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.count}>{total.toLocaleString('en-IN')}</span> members and counting.
          </h2>
          <span className={styles.label}>LIVE FEED</span>
        </div>
        {recent.length > 0 ? (
          <div className={styles.feed}>
            {recent.map((m, i) => (
              <div key={i} className={styles.feedItem}>
                <div className={styles.dot} />
                <span className={styles.feedName}>{m.firstName}</span>
                <span className={styles.feedCity}>from {m.city}</span>
                <span className={styles.feedTime}>
                  {timeAgo(m.joinedAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No members yet — be the first to join!</p>
        )}
      </div>
    </section>
  );
}

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
