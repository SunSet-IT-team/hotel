import styles from './WidthContainer.module.scss';

export const WidthContainer = (Story: any) => {
    return (
        <div className={styles.root}>
            <Story />
        </div>
    );
};
