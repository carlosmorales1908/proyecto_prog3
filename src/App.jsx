import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import Login from "./components/Login";
import AuthGuard from "./guards/auth.guard";

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
            {/* DEFINIR BIEN RUTA Y ELEMENTO LOGIN */}
            <Route path={PublicRutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              {/* DEFINIR BIEN RUTAS PRIVADAS */}
              <Route path={`/*`} element={<p>PRIVADO</p>} />
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
