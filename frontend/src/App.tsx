import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./common/ErrorFallback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HealthDeclarePage from "./features/declare-health/pages/HealthDeclarePage";
import AppHeader from "./common/AppHeader";
import ManageHealthDeclarationPage from "./features/manage-health-declaration/pages/ManageHealthDeclarationPage";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/declare-health" element={<HealthDeclarePage />} />
            <Route
              path="/health-declaration-list"
              element={<ManageHealthDeclarationPage />}
            />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
