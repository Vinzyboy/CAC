import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../partial/Footer";
import Header from "../partial/Header";
import Banner from "./Banner";
import Main from "./Main";
import Count from "./Count";

const Home = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Count" element={<Count />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Home;
