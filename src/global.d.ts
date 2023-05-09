declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_TEST: string;
    REACT_APP_API_KEY: string;
  }
}
