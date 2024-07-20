import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home";
import SidebarLayout from "./components/Sidebar/SidebarLayout";
<<<<<<< HEAD
import LoginPage from "./pages/Login.page";

=======
>>>>>>> 164f5c9bb00f9da49b481692ba4e393656c4a094

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
<<<<<<< HEAD
            <Route path={PublicRutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard privateValidation={true} />}>
=======
            {/* DEFINIR BIEN RUTA Y ELEMENTO LOGIN */}
            <Route path={PublicRutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              {/* DEFINIR BIEN RUTAS PRIVADAS */}
>>>>>>> 164f5c9bb00f9da49b481692ba4e393656c4a094
              <Route path={`/`} element={<SidebarLayout />}>
                <Route path={`home`} element={<Home />} />
                <Route
                  path={`search`}
                  element={<h1>INSERT SEARCH PAGE HERE</h1>}
                />
                <Route
                  path={`my-library`}
                  element={<h1>INSERT MY-LIBRARY PAGE HERE</h1>}
                />
                <Route
                  path={`new-playlist`}
                  element={<h1>INSERT NEW-PLAYLIST PAGE HERE</h1>}
                />
                <Route
                  path={`upload-song`}
                  element={<h1>INSERT UPLOAD-SONG PAGE HERE</h1>}
                />
                <Route
                  path={`my-account`}
                  element={<h1>INSERT MY-ACCOUNT PAGE HERE</h1>}
                />
              </Route>
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
