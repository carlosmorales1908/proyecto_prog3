import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";

const Home = () => {
  const { token } = useContext(AuthContext);
  return (
    <>
      <div>Home Page</div>
      <p>{token}</p>
    </>
  );
};
export default Home;
