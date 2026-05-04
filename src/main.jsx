import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DNDApp from './App.jsx';
import OrdemApp from './App_Ordem.jsx';

const Root = () => {
  const [activeApp, setActiveApp] = useState(() => {
    return localStorage.getItem('rpgCards_activeApp') || 'dnd';
  });

  const switchApp = (app) => {
    setActiveApp(app);
    localStorage.setItem('rpgCards_activeApp', app);
  };

  return (
    <div>
      {activeApp === 'dnd'
        ? <DNDApp activeApp={activeApp} onSwitch={switchApp} />
        : <OrdemApp activeApp={activeApp} onSwitch={switchApp} />
      }
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
