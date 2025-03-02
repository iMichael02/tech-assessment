import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./common/ErrorFallback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HealthDeclarePage from "./features/declare-health/pages/HealthDeclarePage";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route path="/declare-health" element={<HealthDeclarePage />} />
            <Route path="/health-declaration-list" element={<></>} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
