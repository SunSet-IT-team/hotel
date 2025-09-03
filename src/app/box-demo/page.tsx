import { Box } from '@/shared/ui/Box';
import styles from './page.module.scss';

export default function BoxDemoPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Демонстрация компонента Box</h1>
      <p className={styles.description}>
        Простой и надежный компонент-обертка для создания блоков
      </p>
      
      {/* Default Box */}
      <Box>
        <h2>Стандартный блок Box</h2>
        <p>Это стандартный блок с дефолтными значениями (padding: 16px 8px 16px 8px)</p>
      </Box>

      {/* Text content example */}
      <Box paddingTop={24} paddingRight={32} paddingBottom={24} paddingLeft={32}>
        <h2 className={styles.title}>Как найти самый дешевый авиабилет?</h2>
        <p className={styles.paragraph}>
          Ищите авиабилеты, отели и прокат автомобилей на нашем сайте или в приложении.
        </p>
        <p className={styles.paragraph}>
          Найдите быстрые рейсы, любимые авиакомпании, идеальные номера, читайте отзывы и бронируйте без комиссий.
        </p>
        <p className={styles.paragraph}>
          Используйте функцию "Поиск везде" для путешествий.
        </p>
      </Box>

      {/* Layout example */}
      <Box paddingTop={16} paddingRight={24} paddingBottom={16} paddingLeft={24}>
        <div className={styles.layoutContainer}>
          <div className={styles.mainContent}></div>
          <div className={styles.sideContent}>
            <div className={styles.textLines}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.mediumRectangle}></div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.leftButton}></div>
            <div className={styles.rightButton}></div>
          </div>
        </div>
      </Box>

      {/* Examples with different styles */}
      <Box paddingTop={12} paddingRight={16} paddingBottom={12} paddingLeft={16}>
        <div className={styles.exampleText}>Андский</div>
        <div className={styles.exampleText}>Столичный</div>
        <div className={styles.exampleText}>Центральный</div>
      </Box>

      {/* Padding variants */}
      <h3 className={styles.sectionTitle}>Варианты отступов</h3>
      <div className={styles.variantsGrid}>
        <Box paddingTop={0} paddingRight={0} paddingBottom={0} paddingLeft={0}>
          <strong>Без отступов</strong><br/>
          paddingTop={0} paddingRight={0} paddingBottom={0} paddingLeft={0}
        </Box>
        <Box paddingTop={16} paddingRight={16} paddingBottom={16} paddingLeft={16}>
          <strong>Все стороны 16px</strong><br/>
          paddingTop={16} paddingRight={16} paddingBottom={16} paddingLeft={16}
        </Box>
        <Box paddingTop={24} paddingRight={32} paddingBottom={24} paddingLeft={32}>
          <strong>Вертикально 24px, горизонтально 32px</strong><br/>
          paddingTop={24} paddingRight={32} paddingBottom={24} paddingLeft={32}
        </Box>
        <Box paddingTop={8} paddingRight={16} paddingBottom={8} paddingLeft={16}>
          <strong>Вертикально 8px, горизонтально 16px</strong><br/>
          paddingTop={8} paddingRight={16} paddingBottom={8} paddingLeft={16}
        </Box>
      </div>

      {/* Different padding examples */}
      <h3 className={styles.sectionTitle}>Примеры разных отступов</h3>
      <div className={styles.variantsGrid}>
        <Box paddingTop={12} paddingRight={24} paddingBottom={36} paddingLeft={48}>
          <strong>Разные отступы для каждой стороны</strong><br/>
          top: 12px, right: 24px, bottom: 36px, left: 48px
        </Box>
        <Box paddingTop={20} paddingRight={40}>
          <strong>Только сверху и справа</strong><br/>
          paddingTop={20} paddingRight={40}
        </Box>
        <Box paddingLeft={32} paddingRight={32}>
          <strong>Только горизонтальные отступы</strong><br/>
          paddingLeft={32} paddingRight={32}
        </Box>
        <Box paddingTop={16} paddingBottom={16}>
          <strong>Только вертикальные отступы</strong><br/>
          paddingTop={16} paddingBottom={16}
        </Box>
      </div>

      {/* Single side examples */}
      <h3 className={styles.sectionTitle}>Отступы с одной стороны</h3>
      <div className={styles.variantsGrid}>
        <Box paddingTop={48}>
          <strong>Только сверху</strong><br/>
          paddingTop={48}
        </Box>
        <Box paddingRight={40}>
          <strong>Только справа</strong><br/>
          paddingRight={40}
        </Box>
        <Box paddingBottom={32}>
          <strong>Только снизу</strong><br/>
          paddingBottom={32}
        </Box>
        <Box paddingLeft={24}>
          <strong>Только слева</strong><br/>
          paddingLeft={24}
        </Box>
      </div>

      {/* Custom padding example */}
      <Box 
        paddingTop={48} 
        paddingRight={24} 
        paddingBottom={48} 
        paddingLeft={24}
      >
        <h3>Кастомные отступы</h3>
        <p>Этот блок использует кастомные отступы: 48px сверху и снизу, 24px слева и справа</p>
      </Box>
    </div>
  );
}
