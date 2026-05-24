import Link from 'next/link';
import Image from 'next/image';
import LiveStats from '@/components/LiveStats';
import RecentFeed from '@/components/RecentFeed';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>THE COLONY · LIVE NOW</div>
          <h1 className={styles.heroHeading}>
            They can&apos;t kill<br />
            what <em className={styles.heroEm}>refuses to die.</em>
          </h1>
          <p className={styles.heroSub}>
            Register as a member of Roach Republic.
            Find your friends. Build the swarm. One name at a time.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/join" className={styles.heroCtaPrimary}>JOIN THE COLONY →</Link>
            <Link href="/search" className={styles.heroCtaSecondary}>VERIFY A MEMBER</Link>
          </div>
        </div>
      </section>

      {/* ── MASSIVE LIVE COUNTER ── */}
      <LiveStats />

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How it works.</h2>
          <div className={styles.howGrid}>
            {[
              { step: '01', icon: '✍️', title: 'Register', body: 'Fill in your name, phone, and city. Takes 30 seconds. No passwords, no apps, no nonsense.' },
              { step: '02', icon: '🪳', title: 'Get Your Number', body: 'You receive a unique Republic member number. You are now officially part of the colony.' },
              { step: '03', icon: '🔍', title: 'Verify Friends', body: 'Search by name or phone to check if your friends have joined. If not — recruit them.' },
            ].map(card => (
              <div key={card.step} className={styles.howCard}>
                <div className={styles.howStep}>{card.step}</div>
                <div className={styles.howIcon}>{card.icon}</div>
                <h3 className={styles.howTitle}>{card.title}</h3>
                <p className={styles.howBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE FEED ── */}
      <RecentFeed />

      {/* ── WHY JOIN ── */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <span className={styles.label}>// WHY JOIN</span>
          <h2 className={styles.sectionTitle}>What you get.</h2>
          <div className={styles.whyGrid}>
            {[
              { icon: '🪪', title: 'Official Member Number', body: 'A unique, sequential number that proves you were early. Bragging rights forever.' },
              { icon: '🔎', title: 'Verifiable Identity', body: 'Your name appears in the public directory. Anyone can search and confirm you joined.' },
              { icon: '📊', title: 'Live Colony Counter', body: 'Watch the colony grow in real-time. Every new member adds to the swarm.' },
              { icon: '🫂', title: 'Community', body: 'Be part of something bigger. No fees, no subscriptions, no catch. Just conviction.' },
            ].map(card => (
              <div key={card.title} className={styles.whyCard}>
                <div className={styles.whyIcon}>{card.icon}</div>
                <h3 className={styles.whyTitle}>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>READY TO<br />JOIN THE COLONY?</h2>
          <p className={styles.ctaSub}>
            No fees. No apps. No passwords. Just your name and 30 seconds.
          </p>
          <Link href="/join" className={styles.ctaBtn}>REGISTER NOW →</Link>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className={styles.manifesto}>
        <div className={styles.sectionInner}>
          <div className={styles.manifestoInner}>
            <div className={styles.manifestoText}>
              <span className={styles.label}>// THE MANIFESTO</span>
              <h2 className={styles.manifestoTitle}>WE ARE THE ONES THEY FORGOT TO COUNT.</h2>
              <div className={styles.manifestoBody}>
                <p>We are not a political party. We are not a brand. We are not an app.</p>
                <p>We are a list of names — growing, spreading, <em>refusing to be erased.</em></p>
                <p>Every name on this list is a person who showed up. Who typed their city, hit submit, and said: <em>&quot;Count me in.&quot;</em></p>
                <p>That&apos;s it. That&apos;s the republic. Names in a database. Conviction in a text field.</p>
              </div>
            </div>
            <div className={styles.manifestoArt}>
              <Image
                src="/images/manifesto_cockroach_art.png"
                alt="Roach Republic — We refuse to die"
                fill
                style={{ objectFit: 'cover' }}
                sizes="600px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
