import { type FC, type ReactNode } from 'react';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import { Providers } from './providers';

import './styles/index.scss';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};
export default Layout;
