module.exports = {
    '*.{ts,tsx,js,jsx}': ['eslint --fix', 'tsc-files --noEmit'],
    '*.{ts,tsx,js,jsx,json,md,mdx,css,scss,html,yml,yaml}': ['prettier --write'],
};
