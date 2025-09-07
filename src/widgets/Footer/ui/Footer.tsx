import { Typography } from '@/shared/ui/Typography'
import s from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.grid}>
				<div className={s.container}>
					<Typography variant='h1' as='h2' color='white' className={s.title}>
						Присоединяйся к тысячам путешественников
					</Typography>
				</div>
				<div className={s.container}>
					<Typography variant='h2' as='p' color='white' className={s.logo}>
						LOGO
					</Typography>
				</div>
				<div className={s.nav}>
					<Typography
						variant='h2'
						as='a'
						color='white'
						className={s.navLink}
						{...({ href: '#' } as any)}
					>
						Политика использования файлов cookie
					</Typography>
					<Typography
						variant='h2'
						as='a'
						color='white'
						className={s.navLink}
						{...({ href: '#' } as any)}
					>
						Политика конфиденциальности
					</Typography>
					<Typography
						variant='h2'
						as='a'
						color='white'
						className={s.navLink}
						{...({ href: '#' } as any)}
					>
						Наши контакты
					</Typography>
				</div>
			</div>
		</footer>
	)
}
