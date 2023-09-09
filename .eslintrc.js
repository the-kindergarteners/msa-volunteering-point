/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    extends: ['standard-with-typescript', 'standard-jsx', 'standard-react', 'next/core-web-vitals'],
    parserOptions: {
        project: './tsconfig.json'
    }
}