import styles from "./page.module.scss"
import { Header } from "@/widgets/header/ui/Header"
import { Button, Typography } from "@/shared/ui"

export default function Home() {
  return (
    <div className={styles.root}>
      <Header variant="withSolidBg" className={styles.header}></Header>

      <Header variant="withBgImage" className={styles.header}>
        <Typography variant="h1" as="h1" color="white" className={styles.title}>
          Открой мир и путешествуй легко
        </Typography>
        <div className={styles.buttonsBox}>
          <Button variant="white" size="big">
            Город или отель
          </Button>
          <Button variant="white" size="big">
            Дата заезда
          </Button>
          <Button variant="white" size="big">
            Дата выезда
          </Button>
          <Button variant="white" size="big">
            Кол-во гостей
          </Button>
          <Button size="big">Поиск</Button>
        </div>
      </Header>
    </div>
  )
}
