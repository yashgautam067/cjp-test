import { Playfair_Display, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import SwarmCounter from '@/components/SwarmCounter';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-serif',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  variable: '--font-italic',
  display: 'swap',
});

export const metadata = {
  title: 'Roach Republic — We Refuse to Die',
  description:
    'Join Roach Republic. Register as a member, verify your friends, be part of a colony that refuses to be erased.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable} ${cormorant.variable}`}>
      <body>
        <Ticker />
        <Header />
        <main>{children}</main>
        <Footer />
        <SwarmCounter />
      </body>
    </html>
  );
}
