import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.grid}>
                    <div className={styles.container}>
                        <Typography variant="h1" as="h2" color="white" className={styles.title}>
                            Присоединяйся к тысячам путешественников
                        </Typography>
                    </div>
                    <div className={styles.container}>
                        <Typography variant="h2" as="p" color="white" className={styles.logo}>
                            LOGO
                        </Typography>
                    </div>
                    <div className={styles.nav}>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            Политика использования файлов cookie
                        </Typography>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            Политика конфиденциальности
                        </Typography>
                        <Typography
                            variant="h2"
                            as="a"
                            color="white"
                            className={styles.navLink}
                            {...{ href: '#' }}
                        >
                            Наши контакты
                        </Typography>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
