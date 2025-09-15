export const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
} as const;

export const MQ = {
    mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
    tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
    desktopUp: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const;
