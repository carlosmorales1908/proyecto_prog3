import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import AuthContextProvider from "./context/auth.contex";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/routes";
import AuthGuard from "./guards/auth.guard";
import Spinner from "./components/Spinner/Spinner";
import UploadSongPage from "./pages/UploadSong.page";
import PlaylistSongsPage from "./pages/PlaylistSongs.page";
import Profile from "./pages/Profile.page";
import LogoutPage from "./pages/Logout.page";

const SidebarLayout = lazy(() => import("./components/Sidebar/SidebarLayout"));
const LoginPage = lazy(() => import("./pages/Login.page"));
const PlaylistListPage = lazy(() => import("./pages/Playlists.page"));
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
                <Route index element={<Navigate to={PrivateRoutes.HOME} />} />
                <Route
                  path={PrivateRoutes.HOME}
                  index={true}
                  element={<PlaylistListPage />}
                />
                <Route
                  path={PrivateRoutes.PLAYLIST}
                  element={<PlaylistSongsPage />}
                />
                <Route path={PrivateRoutes.LIBRARY} element={<SongsPage />} />
                <Route
                  path={PrivateRoutes.UPLOADSONG}
                  element={<UploadSongPage />}
                />
                <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
                <Route path={PrivateRoutes.LOGOUT} element={<LogoutPage />} />
              </Route>
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
