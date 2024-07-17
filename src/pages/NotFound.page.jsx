import { Route, Routes } from "react-router-dom";

const RoutesNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>NOT FOUND</div>} />
    </Routes>
  );
};
export default RoutesNotFound;
