'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) {
      setError('Enter at least 2 characters to search.');
      return;
    }
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Search failed.');
      } else {
        setResults(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.heroLabel}>// MEMBER DIRECTORY</p>
        <h1 className={styles.heroTitle}>SEARCH.</h1>
        <p className={styles.heroSub}>Check if your friend has joined the colony.</p>
      </section>

      <section className={styles.searchSection}>
        <div className={styles.searchInner}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputWrap}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by name or 10-digit phone number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn} disabled={loading}>
                {loading ? '...' : '🔍'}
              </button>
            </div>
            <p className={styles.searchHint}>
              Try a name like &quot;Rahul&quot; or a phone number like &quot;9876543210&quot;
            </p>
          </form>

          {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

          {results && (
            <div className={styles.resultsWrap}>
              <div className={styles.resultsHeader}>
                <span className={styles.resultsCount}>
                  {results.count} member{results.count !== 1 ? 's' : ''} found
                </span>
                <span className={styles.resultsQuery}>
                  for &quot;{results.query}&quot;
                </span>
              </div>

              {results.count === 0 ? (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🤷</div>
                  <h3>No members found.</h3>
                  <p>They haven&apos;t joined yet — send them the link!</p>
                </div>
              ) : (
                <div className={styles.resultsGrid}>
                  {results.members.map(m => (
                    <div key={m.memberNumber} className={styles.memberCard}>
                      <div className={styles.cardTop}>
                        <div className={styles.verifiedBadge}>✓ VERIFIED MEMBER</div>
                        <div className={styles.cardNumber}>
                          #{String(m.memberNumber).padStart(5, '0')}
                        </div>
                      </div>
                      <div className={styles.cardName}>{m.fullName}</div>
                      <div className={styles.cardLocation}>📍 {m.city}, {m.state}</div>
                      <div className={styles.cardDate}>
                        Joined {new Date(m.joinedAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
