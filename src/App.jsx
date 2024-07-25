import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home";
import SidebarLayout from "./components/Sidebar/SidebarLayout";
import LoginPage from "./pages/Login.page";
import Playlists from "./pages/Playlists.page";

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path={PublicRutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`/`} element={<SidebarLayout />}>
                <Route path={`home`} element={<Home />} />
                <Route
                  path={`library`}
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
                <Route path={`playlists`} element={<Playlists />} />
              </Route>
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
