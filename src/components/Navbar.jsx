import React, { useState, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Clock, BaggageClaim, User, X, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

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

  const { totalItems } = useCart();
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return (
        localStorage.getItem("loggedIn") === "true" ||
        !!localStorage.getItem("authToken")
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setActive(location.pathname || "/");
  }, [location]);

  // Keep user loggedIn for all the pages
  useEffect(() => {
    const handleStorageChange = (val) => {
      if (val.key === "loggedIn" || val.key === "authToken") {
        try {
          const isLoggedIn =
            localStorage.getItem("loggedIn") === "true" ||
            !!localStorage.getItem("authToken");
          setLoggedIn(isLoggedIn);
        } catch {
          setLoggedIn(false);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle navigation item click
  const handleCLick = (path) => {
    setActive(path);
    setOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/");
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
                  onClick={() => handleCLick(item.path)}
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

          {/* Right Actions */}
          <div className={navbarStyles.rightActions}>
            <Link to="/cart" className={navbarStyles.cartLink}>
              <BaggageClaim className={navbarStyles.cartIcon} />
              {totalItems > 0 && (
                <span className={navbarStyles.cartBadge}>{totalItems}</span>
              )}
            </Link>

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className={navbarStyles.accountLink}
              >
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>Logout</span>
              </button>
            ) : (
              <Link to="/login" className={navbarStyles.accountLink}>
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <div className={navbarStyles.mobileMenuButton}>
              <button
                className={navbarStyles.menuButton}
                onClick={() => setOpen((prev) => !prev)}
              >
                {open ? (
                  <X className={navbarStyles.menuIcon} />
                ) : (
                  <Menu className={navbarStyles.menuIcon} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className={navbarStyles.mobileMenu}>
            <div className={navbarStyles.mobileMenuContainer}>
              {navItems.map((item) => {
                const isActive = active === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleCLick(item.path)}
                    className={`${navbarStyles.mobileNavItemBase} ${isActive ? navbarStyles.mobileNavItemActive : navbarStyles.mobileNavItemInactive}`}
                  >
                    <span className={navbarStyles.mobileNavItemText}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}

              <div className={navbarStyles.mobileAccountContainer}>
                {!loggedIn ? (
                  <Link
                    to="/login"
                    onClick={() => {
                      setOpen(false);
                      handleClick("/login");
                    }}
                    className={navbarStyles.mobileAccountLink}
                  >
                    <User className={navbarStyles.accountIcon} />
                    <span className={navbarStyles.accountText}>Login</span>
                  </Link>
                ) : (
                  <button
                    className={navbarStyles.mobileAccountButton}
                    onClick={handleLogout}
                  >
                    <User className={navbarStyles.mobileAccountIcon} />
                    <span className={navbarStyles.accountText}>Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
