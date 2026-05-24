'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header} id="site-header">
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>HOME</Link>
          <Link href="/join" className={`${styles.link} ${pathname === '/join' ? styles.active : ''}`}>JOIN</Link>
          <Link href="/search" className={`${styles.link} ${pathname === '/search' ? styles.active : ''}`}>VERIFY</Link>
        </nav>

        <Link href="/" className={styles.logo}>
          <span className={styles.logoMain}>ROACH <span className={styles.logoAccent}>REPUBLIC</span></span>
          <span className={styles.logoSub}>we refuse to die</span>
        </Link>

        <div className={styles.utils}>
          <Link href="/join" className={styles.joinBtn}>JOIN NOW →</Link>
        </div>
      </div>
    </header>
  );
}
