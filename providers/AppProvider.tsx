import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import ThemeProvider from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Root provider component that wraps the app with all necessary providers
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
} 