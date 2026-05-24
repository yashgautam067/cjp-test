import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoRow}>
          <span className={styles.logo}>ROACH <span className={styles.logoAccent}>REPUBLIC</span></span>
          <span className={styles.tagline}>We Refuse to Die · India</span>
        </div>
        <div className={styles.grid}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>NAVIGATE</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/join">Join the Colony</Link></li>
              <li><Link href="/search">Verify Members</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>LEGAL</h4>
            <ul className={styles.links}>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>CONNECT</h4>
            <ul className={styles.links}>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a></li>
              <li><a href="mailto:hello@roachrepublic.in">✉️ hello@roachrepublic.in</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <p>Roach Republic is an independent community platform. We are not affiliated with any political party, organisation, or individual. Your data is stored securely and never shared with third parties.</p>
        </div>
        <div className={styles.copyright}>
          <span>© 2026 Roach Republic · Built in India · All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
