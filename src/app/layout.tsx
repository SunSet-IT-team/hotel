import { type FC, type ReactNode } from 'react';

import { Footer } from '@/widgets/Footer';
import { HeaderWrapper } from '@/widgets/Header';

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
                    <div style={{ position: 'relative' }}>
                        <HeaderWrapper />
                        <main>{children}</main>
                    </div>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};
export default Layout;
