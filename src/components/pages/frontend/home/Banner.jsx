import { imgPath } from "@/components/helpers/functions-general";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SpinnerTable from "../../backend/partials/spinners/SpinnerTable";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      navigate("/Main"); // Navigate after delay
    }, 2000);
  };

  return (
    <section className="banner-slider flex items-center justify-center h-screen bg-green-950 relative">
      <div className="text-center">
        <img src="/b.png" alt="Logo" className="h-[150px] mx-auto mb-4" />
        <h1 className="text-6xl text-white mb-4 hover:text-gray-200">
          Count a Coconut
        </h1>
        <button
          onClick={handleStart}
          className="btn-animate-start  text-3xl mt-6 bg-green-700 hover:bg-green-800"
          data-text="Start"
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default Banner;
