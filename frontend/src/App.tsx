import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './common/components/ErrorFallback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HealthDeclarePage from './pages/HealthDeclarePage';
import AppHeader from './common/components/AppHeader';
import ManageHealthDeclarationPage from './pages/ManageHealthDeclarationPage';
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
