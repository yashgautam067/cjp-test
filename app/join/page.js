'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
  'Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
];

export default function JoinPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', city: '', state: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { success, member, error }

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, member: data.member });
      } else {
        setResult({ success: false, error: data.error, member: data.member });
      }
    } catch {
      setResult({ success: false, error: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.heroLabel}>// REGISTRATION OPEN</p>
        <h1 className={styles.heroTitle}>JOIN THE COLONY.</h1>
        <p className={styles.heroSub}>30 seconds. No passwords. No apps. Just you.</p>
      </section>

      <div className={styles.body}>
        <div className={styles.infoCol}>
          <span className={styles.infoLabel}>// WHAT HAPPENS NEXT</span>
          <h2 className={styles.infoTitle}>You register. You get a number. You&apos;re in.</h2>
          <p className={styles.infoBody}>
            Your name gets added to the public member directory.
            Your friends can search and verify you joined.
            That&apos;s it — no spam, no calls, no data selling. Ever.
          </p>
          <div className={styles.guarantees}>
            {[
              { icon: '🔒', text: 'Data stored securely in MongoDB' },
              { icon: '🚫', text: 'No spam, no marketing emails' },
              { icon: '👀', text: 'Only name & city visible publicly' },
              { icon: '⚡', text: 'Instant registration' },
            ].map(g => (
              <div key={g.text} className={styles.guarantee}>
                <span className={styles.gIcon}>{g.icon}</span>
                <span className={styles.gText}>{g.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formCol}>
          {result?.success ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>🪳</div>
              <h3 className={styles.successTitle}>Welcome to the Colony!</h3>
              <div className={styles.memberNumber}>
                MEMBER #{String(result.member.memberNumber).padStart(5, '0')}
              </div>
              <div className={styles.memberInfo}>
                <div><strong>{result.member.fullName}</strong></div>
                <div>{result.member.city}, {result.member.state}</div>
                <div className={styles.memberDate}>
                  Joined {new Date(result.member.joinedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </div>
              </div>
              <Link href="/search" className={styles.successLink}>
                → Search for your friends
              </Link>
            </div>
          ) : (
            <div className={styles.formBox}>
              <h3 className={styles.formTitle}>Register as a Member</h3>

              {result?.error && (
                <div className={styles.errorMsg}>
                  ⚠️ {result.error}
                  {result.member && (
                    <div className={styles.existingMember}>
                      You&apos;re already member #{String(result.member.memberNumber).padStart(5, '0')} since{' '}
                      {new Date(result.member.joinedAt).toLocaleDateString('en-IN')}
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="fullName">FULL NAME *</label>
                  <input className={styles.formInput} id="fullName" type="text"
                    placeholder="Your full name" required
                    value={form.fullName} onChange={update('fullName')} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="phone">PHONE NUMBER *</label>
                  <input className={styles.formInput} id="phone" type="tel"
                    placeholder="10-digit mobile number" required
                    pattern="\d{10}" maxLength={10}
                    value={form.phone} onChange={update('phone')} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">EMAIL (optional)</label>
                  <input className={styles.formInput} id="email" type="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={update('email')} />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="city">CITY *</label>
                    <input className={styles.formInput} id="city" type="text"
                      placeholder="Your city" required
                      value={form.city} onChange={update('city')} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="state">STATE *</label>
                    <select className={styles.formSelect} id="state" required
                      value={form.state} onChange={update('state')}>
                      <option value="">Select state</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'REGISTERING...' : 'JOIN THE MOVEMENT →'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
