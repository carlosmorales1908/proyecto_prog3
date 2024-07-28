import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
import Spinner from "./components/Spinner/Spinner";

const SidebarLayout = lazy(() => import("./components/Sidebar/SidebarLayout"));
const LoginPage = lazy(() => import("./pages/Login.page"));
const Playlists = lazy(() => import("./pages/Playlists.page"));
const SongsPage = lazy(() => import("./pages/Song.page"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path={PublicRutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`/`} element={<SidebarLayout />}>
                <Route path={PrivateRoutes.HOME} element={<Playlists />} />
                {/* HACERUN UN COMPONENTE PLAYLIST QUE MUESTRE LAS CANCIONES DE ESA PLAYLIST */}
                <Route
                  path={PrivateRoutes.PLAYLIST}
                  element={<p>Aqui van los datos de una playlist</p>}
                />
                {/* ------ */}
                <Route path={PrivateRoutes.LIBRARY} element={<SongsPage />} />
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
