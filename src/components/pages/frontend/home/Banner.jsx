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
    <section className="banner-slider relative">
      {loading ? (
        // ✅ Show loader with tinted background
        <div className="fixed inset-0 bg-[#0a3015] bg-opacity-100 flex items-center justify-center z-50">
          <SpinnerTable />
        </div>
      ) : (
        <>
          <img
            src={`${imgPath}/banner1.png`}
            alt=""
            className="w-full object-cover h-[775px] relative"
          />
          <div className="tint w-full h-screen bg-black bg-opacity-40 absolute top-0 left-0"></div>
          <div className="absolute bottom-[20rem] left-[25rem] text-white">
            <h1 className="text-8xl mb-3 hover:text-gray-200">
              COCONUT TREES <br />
              <div className="mt-3 text-center">DETECTION</div>
            </h1>
            <h2 className="hover:text-gray-200 text-center">
              Counting of Coconut Trees
            </h2>
          </div>
          <div className="absolute left-[40rem] bottom-[14rem]">
            <button
              onClick={handleStart} // Trigger loading state
              className="btn-animate-start text-white text-5xl"
              data-text="Start"
            >
              Start
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Banner;
