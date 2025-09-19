import { type ComponentType } from 'react';
import type { Decorator } from '@storybook/nextjs';

import styles from './WidthContainer.module.scss';

const WidthContainer: Decorator = (Story: ComponentType) => {
    return (
        <div className={styles.root}>
            <Story />
        </div>
    );
};

export default WidthContainer;
