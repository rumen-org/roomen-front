module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended', // vue3-essential 대신 vue3-recommended로 변경
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended', // typescript-recommended로 변경
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off', // 단일 단어 컴포넌트 이름 허용
    '@typescript-eslint/no-unused-vars': ['warn'], // TypeScript에서 사용하지 않는 변수 경고
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 강제 비활성화
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        tabWidth: 2,
        printWidth: 100,
        trailingComma: 'none',
        bracketSpacing: true,
        arrowParens: 'avoid'
      }
    ]
  }
};
