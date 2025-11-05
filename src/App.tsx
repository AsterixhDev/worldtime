import React from 'react';
import Routes from './Routes';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Routes />
    </SettingsProvider>
  );
}

export default App;