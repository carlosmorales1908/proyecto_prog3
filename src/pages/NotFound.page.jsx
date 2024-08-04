import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import NotFound from "../components/NotFound/NotFound";

const NotFound = lazy(() => import("../components/NotFound/NotFound"));

const RoutesNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={
          <NotFound/>
        }
      />
    </Routes>
  );
};
export default RoutesNotFound;
