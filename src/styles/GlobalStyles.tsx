import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Color System - Light Theme */
    --color-primary: #0070f3;
    --color-primary-light: #3291ff;
    --color-primary-dark: #0050b3;
    
    --color-secondary: #6c757d;
    --color-secondary-light: #868e96;
    --color-secondary-dark: #495057;
    
    --color-accent: #ff6b6b;
    --color-accent-light: #ff8787;
    --color-accent-dark: #f03e3e;
    
    --color-success: #37b24d;
    --color-success-light: #69db7c;
    --color-success-dark: #2b9348;
    
    --color-warning: #fcc419;
    --color-warning-light: #ffd43b;
    --color-warning-dark: #e67700;
    
    --color-error: #e03131;
    --color-error-light: #fa5252;
    --color-error-dark: #c92a2a;
    
    --color-neutral-50: #f8f9fa;
    --color-neutral-100: #f1f3f5;
    --color-neutral-200: #e9ecef;
    --color-neutral-300: #dee2e6;
    --color-neutral-400: #ced4da;
    --color-neutral-500: #adb5bd;
    --color-neutral-600: #868e96;
    --color-neutral-700: #495057;
    --color-neutral-800: #343a40;
    --color-neutral-900: #212529;
    
    --color-background:rgb(255, 255, 255);
    --color-text: var(--color-neutral-900);
    
    /* Spacing System (8px) */
    --space-1: 0.25rem; /* 4px */
    --space-2: 0.5rem;  /* 8px */
    --space-3: 1rem;    /* 16px */
    --space-4: 1.5rem;  /* 24px */
    --space-5: 2rem;    /* 32px */
    --space-6: 3rem;    /* 48px */
    
    /* Font System */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      
    --font-size-xs: 0.75rem;   /* 12px */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-md: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px */
    --font-size-3xl: 1.875rem; /* 30px */
    
    /* Border Radius */
    --radius-sm: 0.25rem;  /* 4px */
    --radius-md: 0.5rem;   /* 8px */
    --radius-lg: 0.75rem;  /* 12px */
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* Transition */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }
  
  [data-theme='dark'] {
    --color-primary: #3291ff;
    --color-primary-light: #4da3ff;
    --color-primary-dark: #0070f3;
    
    --color-background: #1a1a1a;
    --color-text:rgb(68, 90, 160);
    
    --color-neutral-50: #18191a;
    --color-neutral-100: #242526;
    --color-neutral-200: #3a3b3c;
    --color-neutral-300: #4e4f50;
    --color-neutral-400: #6a6c6d;
    --color-neutral-500: #8a8c8e;
    --color-neutral-600:rgb(131, 172, 243);
    --color-neutral-700:rgb(115, 160, 228);
    --color-neutral-800:rgb(80, 125, 238);
    --color-neutral-900: #f5f6f7;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body, #root {
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    line-height: 1.5;
    color: var(--color-text);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: var(--space-3);
  }
  
  h1 { font-size: var(--font-size-3xl); }
  h2 { font-size: var(--font-size-2xl); }
  h3 { font-size: var(--font-size-xl); }
  h4 { font-size: var(--font-size-lg); }
  h5 { font-size: var(--font-size-md); }
  h6 { font-size: var(--font-size-sm); }
  
  p {
    margin-bottom: var(--space-3);
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  
  a:hover {
    color: var(--color-primary-dark);
  }
  
  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
  }
  
  button {
    cursor: pointer;
  }
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: var(--space-3);
  }
`;

export default GlobalStyles;