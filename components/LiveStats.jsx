'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './LiveStats.module.css';

/**
 * Animated number counter — counts from 0 to target
 */
function AnimatedNumber({ target, duration = 2000, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={styles.number}>
      {display.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function LiveStats() {
  const [stats, setStats] = useState({ total: 0, cityCount: 0, stateCount: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats({
          total: data.total || 0,
          cityCount: data.cityCount || 0,
          stateCount: data.stateCount || 0,
        });
        setLoaded(true);
      } catch {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.liveDot} />
          LIVE COLONY STATUS
        </div>

        <div className={styles.grid}>
          <div className={styles.stat}>
            <AnimatedNumber target={stats.total} />
            <div className={styles.statLabel}>MEMBERS JOINED</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <AnimatedNumber target={stats.cityCount} suffix="+" />
            <div className={styles.statLabel}>CITIES</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <AnimatedNumber target={stats.stateCount} />
            <div className={styles.statLabel}>STATES</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.number}>∞</span>
            <div className={styles.statLabel}>REASONS TO JOIN</div>
          </div>
        </div>

        {loaded && (
          <div className={styles.statusBar}>
            <span className={styles.statusDot} />
            Colony is <strong>ACTIVE</strong> — last member joined{' '}
            <span className={styles.statusHighlight}>moments ago</span>
          </div>
        )}
      </div>
    </section>
  );
}
