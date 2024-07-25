import { Route, Routes } from "react-router-dom";

const RoutesNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={
          <div
            style={{
              backgroundColor: "aquamarine",
              color: "black",
              height: "100vh",
              fontWeight: "bold",
              fontSize: "10rem",
            }}
          >
            NOT FOUND
          </div>
        }
      />
    </Routes>
  );
};
export default RoutesNotFound;
