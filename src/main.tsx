import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StoreManager } from './components/StoreManager';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreManager>
      <App />
    </StoreManager>
  </React.StrictMode>,
);
