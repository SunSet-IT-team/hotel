'use client';

import { LogoIcon } from '@/shared/assets/icons';
import { useTranslation } from '@/shared/hooks';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';

import styles from './Footer.module.scss';

export const Footer = () => {
    const translate = useTranslation();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.grid}>
                    <div className={styles.container}>
                        <Typography variant="h1" as="h2" color="white" className={styles.title}>
                            {translate.footer.title}
                        </Typography>
                    </div>
                    <div className={styles.container}>
                        <LogoIcon className={styles.logo} />
                    </div>
                    <div className={styles.nav}>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            {translate.footer.cookiePolicy}
                        </Typography>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            {translate.footer.privacyPolicy}
                        </Typography>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            {translate.footer.contacts}
                        </Typography>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
