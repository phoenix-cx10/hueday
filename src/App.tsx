import React, { useState } from 'react';
import Header from './components/Header';
import Background from './components/background';

function App() {
  const [activeView, setActiveView] = useState<'calendar' | 'stats' | 'history'>('calendar');

  return (
    <>
    <Background />
    <Header onNavigate={(view) => setActiveView(view)} />
    </>
  );
}

export default App;
