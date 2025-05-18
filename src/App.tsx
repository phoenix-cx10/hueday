import React, { useState } from 'react';
import Header from './components/Header';
import Background from './components/background';
import { MoodProvider } from './datafiles/moodContext';
import CalendarView from './components/CalendarView';

function App() {
  const [activeView, setActiveView] = useState<'calendar' | 'stats' | 'history'>('calendar');

  return (
    <MoodProvider>
      <Background />
      <div className="min-h-screen relative">
        <Header onNavigate={setActiveView} />

        <main className="container mx-auto px-4 pt-28 pb-20 space-y-12">
          {activeView === 'calendar' && <CalendarView />}
        </main>
      </div>
    </MoodProvider>
  );
}

export default App;
