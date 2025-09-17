declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
