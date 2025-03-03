import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './common/ErrorFallback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HealthDeclarePage from './features/declare-health/pages/HealthDeclarePage';
import AppHeader from './common/AppHeader';
import ManageHealthDeclarationPage from './features/manage-health-declaration/pages/ManageHealthDeclarationPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <AppHeader />
            <Routes>
              <Route path='/declare-health' element={<HealthDeclarePage />} />
              <Route
                path='/health-declaration-list'
                element={<ManageHealthDeclarationPage />}
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
