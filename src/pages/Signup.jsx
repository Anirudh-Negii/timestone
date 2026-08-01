import React, { useState } from "react";
import { signUpStyles } from "../assets/dummyStyles";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, User, Mail, Lock, EyeOff, Eye } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("Please tick 'Remember me' to continue", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    toast.success("Signup successful", {
      position: "top-right",
      autoClose: 1200,
      theme: "light",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };
  return (
    <div
      className={signUpStyles.pageContainer}
      style={signUpStyles.pageFontStyle}
    >
      <ToastContainer />
      <button className={signUpStyles.backButton} onClick={() => navigate("/")}>
        <ArrowLeft className={signUpStyles.backIcon} />
        <span className={signUpStyles.backText}>Back to Home</span>
      </button>

      <div className={signUpStyles.formContainer}>
        <div className={signUpStyles.card}>
          <div className={signUpStyles.decorativeCircle}></div>
          <h1 className={signUpStyles.title} style={signUpStyles.pageFontStyle}>
            Create an Account
          </h1>
          <p className={signUpStyles.subtitle}>Join our community today!</p>

          <form onSubmit={handleSubmit} className={signUpStyles.form}>
            <label className={signUpStyles.label}>Full Name</label>
            <div className={signUpStyles.inputContainer}>
              <div className={signUpStyles.inputIconContainer}>
                <User className={signUpStyles.inputIcon} />
              </div>
              <input
                type="text"
                value={name}
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                className={signUpStyles.inputField}
                required
              />
            </div>
            <label className={signUpStyles.label}>Email</label>
            <div className={signUpStyles.inputContainer}>
              <div className={signUpStyles.inputIconContainer}>
                <Mail className={signUpStyles.inputIcon} />
              </div>
              <input
                type="email"
                value={email}
                placeholder="your.email@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={signUpStyles.inputField}
                required
              />
            </div>

            <label className={signUpStyles.label}>Password</label>
            <div className={signUpStyles.inputContainer}>
              <div className={signUpStyles.inputIconContainer}>
                <Lock className={signUpStyles.inputIcon} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                className={signUpStyles.inputField}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={signUpStyles.passwordToggleButton}
              >
                {showPassword ? (
                  <EyeOff className={signUpStyles.passwordIcon} />
                ) : (
                  <Eye className={signUpStyles.passwordIcon} />
                )}
              </button>
            </div>

            <div className={signUpStyles.checkboxContainer}>
              <label className={signUpStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  required
                  className={signUpStyles.checkboxInput}
                />
                <span className={signUpStyles.checkboxText}>Remember me</span>
              </label>
            </div>

            <button type="submit" className={signUpStyles.submitButton}>
              Sign Up
            </button>
          </form>

          <div className={signUpStyles.bottomContainer}>
            <span className={signUpStyles.bottomText}>
              Already have an account?{" "}
            </span>
            <Link to="/login" className={signUpStyles.loginLink}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
