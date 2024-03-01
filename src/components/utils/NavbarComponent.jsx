import { Link } from "react-router-dom";
import { useAuth } from "../../security/AuthContext.jsx";
import { styles } from "../../styles.js";
import { useState, useEffect } from "react";
import { navLinks } from "../../constants/index.js";
import { icon, menu, close } from "../../assets/index.js";

function NavbarComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");

  const toPath = (link) => {
    return link.path;
  };

  function logout() {
    authContext.logout();
    setToggle(!toggle);
  }

  useEffect(() => {
    const currentPath = window.location.pathname;

    const activeLink = navLinks.find((link) => link.path === currentPath);

    setActive(activeLink ? activeLink.id : "");
  }, [isAuthenticated]);

  return (
    <header
      className={`${styles.paddingX} w-full flex items-center py-5 top-0 z-20 bg-gray-900`}
    >
      <div className="w-full flex justify-between items-center max-w-7x1 mx-auto">
        <Link
          to="https://kwgh0st.github.io/wojtachakarol/"
          target="_blank"
          className="flex items-center gap-6 text-2xl font-bold text-white ease-in duration-300 hover:text-gray-500"
        >
          <img src={icon} alt="avatar" className="w-12 m-0 p-0"></img>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Tasks&nbsp;
            <span className="md:block hidden">Management App</span>
          </p>
        </Link>
        {isAuthenticated && (
          <ul className="hidden md:flex gap-2">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "bg-gray-950" : "bg-slate-500"
                } 
                ${
                  !authContext.isAdmin() && link.id === "Admin" ? "hidden" : ""
                } px-4 py-2 bg-slate-500 rounded-xl ease-in duration-300 hover:bg-gray-950 cursor-pointer`}
              >
                <Link
                  className="text-white"
                  key={link.id}
                  to={toPath(link)}
                  onClick={
                    link.id === "Logout"
                      ? logout
                      : () => {
                          setToggle(!toggle);
                          setActive(link.id);
                        }
                  }
                >
                  {link.id}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {isAuthenticated && (
          <div className="md:hidden flex flex-1 justify-end items-center">
            <button
              className="w-28px h-28px object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[48px] h-[48px] object-contain cursor-pointer rounded-full bg-slate-500"
              />
            </button>
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-slate-500 absolute top-20 rigth-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl
              }`}
            >
              <ul className="list-none flex justify-end items-start gap-4 flex-col">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`
                    ${
                      !authContext.isAdmin() && link.id === "Admin"
                        ? "hidden"
                        : ""
                    }
                    ${active === link.id ? "text-blue-700" : " text-gray-950"}
                     ease-in duration-300 hover:text-blue-700 font-medium cursor-pointer text-16px`}
                  >
                    <Link
                      key={link.id}
                      to={link.path}
                      onClick={
                        link.id === "Logout"
                          ? logout
                          : () => {
                              setToggle(!toggle);
                              setActive(link.id);
                            }
                      }
                    >
                      {link.id}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavbarComponent;
