import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home";
import LoginPage from "./pages/Login.page";


function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
            <Route path={PublicRutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`/home`} element={<Home />} />
              <Route path={`/dashboard`} element={<p>DASHBOARD PAGE</p>} />
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
