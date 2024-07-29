import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
// import Home from "./pages/Home";
import SidebarLayout from "./components/Sidebar/SidebarLayout";
import LoginPage from "./pages/Login.page";

import Playlists from "./pages/Playlists.page";

import SongsPage from "./pages/Song.page";
import Spinner from "./components/Spinner/Spinner";
import UploadSongPage from "./pages/UploadSong.page";
import Profile from "./pages/Profile.page";

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
                  path={PrivateRoutes.UPLOADSONG}
                  element={<UploadSongPage />}
                />
                <Route
                  path={`my-account`}
                  element={<h1>INSERT MY-ACCOUNT PAGE HERE</h1>}
                />
                <Route path={`playlists`} element={<Playlists />} />
                <Route path={`profile`} element={<Profile />} />
              </Route>
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
