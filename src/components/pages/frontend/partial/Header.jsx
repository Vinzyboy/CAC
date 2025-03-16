import { Menu, Search, ShoppingBasket } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => setScrollPosition(scrollY));
    return window.removeEventListener("scroll", () =>
      setScrollPosition(scrollY)
    );
  }, []);

  return (
    <header
      className={`${
        scrollPosition > 150 ? "bg-white" : ""
      } fixed w-full top-0 left-0 bg-transparent z-50 md:hover:bg-white transition-all ${
        isOpen ? "bg-white text-block" : "bg-transparent text-white"
      }`}
    >
      <div className="container">
        <div
          className={`${
            scrollPosition > 150 ? "!text-black" : ""
          } flex justify-between items-center py-4  md:hover:text-black`}
        >
          <button
            className={`${isOpen ? "active" : ""} menu-btn md:hidden `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`${scrollPosition === 0 ? "bg-white" : "bg-black"} ${
                isOpen && "!bg-black"
              }`}
            ></span>
            <span
              className={`${scrollPosition === 0 ? "bg-white" : "bg-black"} ${
                isOpen && "!bg-black"
              }`}
            ></span>
            <span
              className={`${scrollPosition === 0 ? "bg-white" : "bg-black"} ${
                isOpen && "!bg-black"
              }`}
            ></span>
          </button>

          <Link to="/" className="text-xl uppercase font-bold">
            CTD
          </Link>

          <nav
            className={`fixed md:static w-full h-screen md:h-auto top-[61px] left-0 bg-white md:bg-transparent md:w-auto ${
              isOpen ? "text-black block" : "hidden md:block"
            }`}
          >
           
          </nav>

         
        </div>
      </div>
    </header>
  );
};

export default Header;
