/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'type-enum': [
            2,
            'always',
            [
                'feature',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert',
            ],
        ],
    },
};
