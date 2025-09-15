import { Container } from '@/shared/ui/Container';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/header/ui/Header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import './styles/index.scss';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Hotel Booking - Открой мир и путешествуй легко',
    description: 'Бронирование отелей, авиабилетов, автомобилей и туров',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers>
                    <Container>
                        <Header variant="transparent" />
                    </Container>
                    <Container>{children}</Container>
                    <Container>
                        <Footer />
                    </Container>
                </Providers>
            </body>
        </html>
    );
}
