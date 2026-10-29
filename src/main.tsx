import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadAllAssets } from './services/assetPreloader';

// Ensure all assets (facilitators, hero images, brand logo) are loaded and decoded into memory at site opening
preloadAllAssets();

createRoot(document.getElementById('root')!).render(<App />);

