import type { Metadata } from 'next';
import { sourceSerif4, ibmPlexSans } from '@/app/fonts';
import { AuthProvider } from '@/context/AuthContext';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'PowerGrid Hackathon 2026 | CPRI × VED',
  description:
    'A flagship engineering hackathon by the Central Power Research Institute (CPRI) and VED. Build real solutions for India\u2019s power grid. Register now.',
  keywords: [
    'hackathon',
    'CPRI',
    'VED',
    'power grid',
    'energy',
    'engineering',
    'India',
    '2026',
  ],
  openGraph: {
    title: 'PowerGrid Hackathon 2026 | CPRI × VED',
    description:
      'A flagship engineering hackathon by CPRI and VED. Register your team now.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Inject font CSS variables onto <html> so they're available globally
      className={`${sourceSerif4.variable} ${ibmPlexSans.variable}`}
    >
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
