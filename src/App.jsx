import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import Home from "./pages/Home.jsx";
import Brand from "./pages/Brand.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Watch from "./pages/Watch.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import { ArrowUp } from "lucide-react";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

const App = () => {
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen w-full overflow-x-hidden antialiased bg-white text-slate-900">
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brandName" element={<Brand />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watches" element={<Watch />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 bottom-6 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
          ${
            showButton
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
          bg-gray-600 text-white hover:bg-amber-700`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default App;
