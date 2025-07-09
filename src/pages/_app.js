import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css' 
import { AuthProvider } from '../context/AuthContext';
import { FeedbackProvider } from '@/context/FeedBackContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
        <FeedbackProvider>
          <Component {...pageProps} />
        </FeedbackProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
