## Roomen-FrontEnd

∙ 기반 
- Vue.js3 & TypeScript
- Composition Api 기반 구조
- Vite, Axios, Pinia, Sass

∙ 구조
- components/pages를 views/ 에서 Import 컴포넌트 사용
- 사용자입력 요소 (Input) && 테이블 && layout의 요소등은 컴포넌트안에 구성됨
- I18n (언어별 Config 파일)은 locales/안에서 수정
- 레이아웃(메인/서브/에러등)은 layouts/ 내부에 위치하며, 사용은 router/ 참조바람
- Rest Api 관련 작업등은 stores/ 에서 상태관리 (api/ 이건 기본 CRUD에 대한 예비 세팅)


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
