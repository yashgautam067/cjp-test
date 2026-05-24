'use client';

import styles from './Ticker.module.css';

const TICKER_TEXT =
  "ROACH REPUBLIC · WE REFUSE TO DIE · JOIN THE COLONY · REGISTER NOW · VERIFY YOUR FRIENDS · MAIN BHI ROACH · THE SWARM IS GROWING · ";

export default function Ticker() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <span>{TICKER_TEXT.repeat(6)}</span>
      </div>
    </div>
  );
}
