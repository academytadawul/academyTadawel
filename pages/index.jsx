import { useEffect } from "react";
import { Main } from "../components/Main";
import "react-toastify/dist/ReactToastify.css"; 

const View = () => {
  useEffect(() => {
    document.body.style.background = "black";
  }, []);
  return <Main/>;
};
export default View;
