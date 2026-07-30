import React, { useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Clock, BaggageClaim } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Watches", path: "/watches" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname || "/");

  const handleCLick = (path) => {
    setActive(path);
    setOpen(false);
  };

  return (
    <header className={navbarStyles.header}>
      <nav className={navbarStyles.nav} role="navigation">
        <div className={navbarStyles.container}>
          {/* Logo */}
          <div className={navbarStyles.brandContainer}>
            <div className={navbarStyles.logoContainer}>
              <Clock className={navbarStyles.logoIcon} />
            </div>
            <Link
              to="/"
              onClick={() => handleCLick("/")}
              className={navbarStyles.logoLink}
            >
              <span
                className={navbarStyles.logoText}
                style={navbarStyles.logoTextStyle}
              >
                TimeStone
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => {
              const isActive = active === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavCLick(item.path)}
                  className={`${navbarStyles.navItemBase} ${
                    isActive
                      ? navbarStyles.navItemActive
                      : navbarStyles.navItemInactive
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`${navbarStyles.navItemIndicator} ${
                      isActive
                        ? navbarStyles.navItemIndicatorVisible
                        : navbarStyles.navItemIndicatorHidden
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/*  */}
          <div className={navbarStyles.rightActions}>
            <Link to="/cart" className={navbarStyles.cartLink}>
                <BaggageClaim className={navbarStyles.cartIcon} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
