'use client';

import { useEffect, useState } from 'react';
import styles from './SwarmCounter.module.css';

export default function SwarmCounter() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setTotal(data.total || 0);
      } catch {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.widget}>
      <div className={styles.dot} />
      <div className={styles.text}>
        <span className={styles.live}>{total.toLocaleString('en-IN')} in the colony</span>
        <span className={styles.sub}>roachrepublic.in</span>
      </div>
    </div>
  );
}
