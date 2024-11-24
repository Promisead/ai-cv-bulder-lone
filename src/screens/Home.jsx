import React, { useEffect } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Home.css";

const Crea8CV = () => {
  let navigate = useNavigate();

  const navigateHandler = (to) => {
    navigate(to);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <header className="header" data-aos="fade-down">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2 text-blue" href="#">
          <FaFileInvoice className="me-2 navbar-brand-text" />
          <span className="navbar-brand-text">Crea8</span> CV
            {/* <span>
              <i className="fa-solid fa-file-invoice"></i>
            </span>
            <span className="navbar-brand-text">Crea8</span> CV */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown" data-aos="fade-left">
                <a
                  className="nav-link dropdown-toggle text-blue fs-18"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resume Templates
                </a>
                <ul
                  className="dropdown-menu bg-white"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Job CV
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Academic CV
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-login btn-primary ms-lg-4 px-4 fs-16 mt-1 mt-lg-0"
              onClick={() => navigateHandler("login")}
              data-aos="fade-left"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <div
        className="header-banner bg-light-blue d-flex align-items-center justify-content-center"
        data-aos="fade-up"
      >
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="text-uppercase text-white fw-6 lh-1 display-5">
            Build your professional CV in just 5{" "}
            <span className="text-lowercase text-white">minutes!</span>
          </h1>
          <p className="text-white fs-4 mt-3 mb-5">
            User-friendly and a great time saver for professionals.
          </p>
          <button
            className="btn btn-lg text-capitalize btn-primary fs-4"
            onClick={() => navigateHandler("signup")}
            data-aos="fade-up"
          >
            Let's get started
          </button>
        </div>
      </div>
    </header>
  );
};

const MainContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <main>
      {/* Steps Section */}
      <section
        className="steps py-8"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        }}
      >
        <div>
          <div className="row section-title  text-center" data-aos="fade-up">
            <div className="col-12 text-black">
              <h2
                className="display-6 text-custom fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                Create Your Perfect Resume in Simple Steps
              </h2>
              <p
                className="text-black fs-4 my-4 mx-auto"
                style={{ maxWidth: "750px", lineHeight: "1.7" }}
              >
                Effortlessly create a job-worthy resume and cover letter that
                gets you hired faster, with a user-friendly experience.
              </p>
            </div>
          </div>

          <div className="row text-black steps-list">
            {/* Step 1 */}
            <div
              className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center"
              data-aos="fade-up"
            >
              <div
                className="steps-item-icon text-white bg-gradient d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              >
                <a href="/template">
                  <i
                    className="fa-solid fa-layer-group fa-2x"
                    style={{ color: "#2575fc" }}
                  ></i>
                </a>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-bold text-custom">
                  Choose Your Template
                </h3>
                <p className="text-black fs-5">
                  Select from a variety of professional templates and colors to
                  create a standout resume.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center"
              data-aos="fade-up"
            >
              <div
                className="steps-item-icon text-black bg-gradient d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              >
                <a href="form.html">
                  <i
                    className="fa-solid fa-file-lines fa-2x"
                    style={{ color: "#2575fc" }}
                  ></i>
                </a>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-bold text-custom">
                  Place Your Information
                </h3>
                <p className="text-black fs-5">
                  Fill in your details and track your CV with a real-time
                  preview.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center"
              data-aos="fade-up"
            >
              <div
                className="steps-item-icon text-black bg-gradient d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              >
                <i
                  className="fa-solid fa-download fa-2x"
                  style={{ color: "#2575fc" }}
                ></i>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-bold text-custom">Download Instantly</h3>
                <p className="text-black fs-5">
                  Instantly download your resume in PDF format and share via a
                  link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section id="user-reviews" className="py-5 bg-white" data-aos="fade-up">
        <div className="container">
          <h2
            className="text-center text-white mb-4"
            style={{ fontWeight: "700", letterSpacing: "1px" }}
          >
            What Our Users Say
          </h2>
          <div className="row">
            {/* Review 1 */}
            <div className="col-md-4" data-aos="fade-up">
              <div
                className="card mb-4 shadow-lg"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body">
                  <blockquote className="blockquote mb-0 text-white">
                    <p>
                      "This resume builder saved me so much time! Highly
                      recommended."
                    </p>
                    <footer className="blockquote-footer text-white">John Doe</footer>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="col-md-4" data-aos="fade-up">
              <div
                className="card mb-4 shadow-lg"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body">
                  <blockquote className="blockquote mb-0 text-white">
                    <p>
                      "A simple and easy-to-use tool for creating a professional
                      CV."
                    </p>
                    <footer className="blockquote-footer text-white">Jane Smith</footer>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="col-md-4" data-aos="fade-up">
              <div
                className="card mb-4 shadow-lg"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body">
                  <blockquote className="blockquote mb-0 text-white">
                    <p>
                      "I loved the user interface. It made the process quick and
                      efficient."
                    </p>
                    <footer className="blockquote-footer text-white">Michael Brown</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer
      className="pt-5"
      data-aos="fade-up"
      style={{
        background: "linear-gradient(135deg, #2166EB, #2168EB)",
        color: "#031229",
      }}
    >
      <div className="container my-md-4">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-6 col-lg-3 my-2">
            <div
              className="navbar-brand fw-bold fs-2 d-flex align-items-center"
              style={{ color: "#f5f5f5" }}
            >
              <FaFileInvoice className="me-2 text-white" />
              <span className="text-white">Crea8 CV</span>
            </div>
            <p
              className="my-3"
              style={{ fontSize: "1.1rem", color: "#e0e0e0" }}
            >
              Our resume builder helps you create your perfect resume, 100%
              free.
            </p>
            <div className="d-flex">
              {/* Social Media Icons */}
              <a
                href="#"
                className="me-3 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="me-3 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <FaTwitter />
              </a>
              <a href="#" className="text-white" style={{ fontSize: "1.5rem" }}>
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-md-6 col-lg-2 my-2">
            <h5
              className="fw-bold mb-4"
              style={{ fontSize: "1.3rem", color: "#f5f5f5" }}
            >
              Company
            </h5>
            <ul className="list-unstyled">
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  About Us
                </a>
              </li>
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Services
                </a>
              </li>
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="col-md-6 col-lg-2 my-2">
            <h5
              className="fw-bold mb-4"
              style={{ fontSize: "1.3rem", color: "#f5f5f5" }}
            >
              Community
            </h5>
            <ul className="list-unstyled">
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Forum
                </a>
              </li>
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Blog
                </a>
              </li>
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Podcast
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-md-6 col-lg-2 my-2">
            <h5
              className="fw-bold mb-4"
              style={{ fontSize: "1.3rem", color: "#f5f5f5" }}
            >
              Support
            </h5>
            <ul className="list-unstyled">
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Help Center
                </a>
              </li>
              <li className="my-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-md-6 col-lg-3 my-2">
            <h5
              className="fw-bold mb-4"
              style={{ fontSize: "1.3rem", color: "#f5f5f5" }}
            >
              Subscribe
            </h5>
            <p
              className="mb-4"
              style={{ fontSize: "1.1rem", color: "#e0e0e0" }}
            >
              Get the latest updates right in your inbox.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                style={{ borderRadius: "25px 0 0 25px", padding: "10px" }}
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ borderRadius: "0 25px 25px 0", padding: "10px 20px" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-4" style={{ background: "#141414" }}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            {/* Copyright */}
            <div className="col-md-8 my-1">
              <small className="text-light">
                © 2024 Crea8 CV. All Rights Reserved.
              </small>
            </div>
            {/* Legal Links */}
            <div className="col-md-4 my-1 text-md-end">
              <a
                href="#"
                className="text-light text-decoration-none me-4"
                style={{ transition: "color 0.3s ease" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-light text-decoration-none"
                style={{ transition: "color 0.3s ease" }}
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PricingSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section id="pricing" className="py-8 bg-light">
      <div className="container">
        <div className="row section-title text-center mb-5" data-aos="fade-up">
          <div className="col-12">
            <h2 className="display-5 text-custom fw-bold">Choose Your Plan</h2>
            <p className="text-light fs-4 mt-3">
              Select the perfect plan that suits your needs.
            </p>
          </div>
        </div>

        <div className="row justify-content-center text-center">
          {/* Basic Plan */}
          <div className="col-lg-4 col-md-6 mb-5" data-aos="fade-up">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-transparent">
                <h3 className="fs-4 fw-bold text-white">Basic</h3>
              </div>
              <div className="card-body">
                <h4 className="display-6 text-white">$9</h4>
                <p className="text-white fs-5">Per month</p>
                <ul className="list-unstyled my-4">
                  <li className="mb-3  text-white">
                    <i className="fa-solid fa-check text-white me-2"></i>5 CV
                    Templates
                  </li>
                  <li className="mb-3  text-white">
                    <i className="fa-solid fa-check text-white me-2"></i>
                    Download in PDF
                  </li>
                  <li className="mb-3  text-white">
                    <i className="fa-solid fa-check text-white me-2"></i>
                    Email Support
                  </li>
                </ul>
                <a href="#" className="btn btn-primary btn-block">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div
            className="col-lg-4 col-md-6 mb-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="card shadow-lg border-0 bg-white">
              <div className="card-header bg-transparent">
                <h3 className="fs-4 fw-bold text-blue">Pro</h3>
              </div>
              <div className="card-body">
                <h4 className="display-6 text-blue">$19</h4>
                <p className="text-grey fs-5">Per month</p>
                <ul className="list-unstyled my-4">
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-blue me-2"></i>
                    15 CV Templates
                  </li>
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-blue me-2"></i>
                    Download in PDF and Word
                  </li>
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-blue me-2"></i>
                    Priority Email Support
                  </li>
                </ul>
                <a href="#" className="btn btn-primary btn-block">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div
            className="col-lg-4 col-md-6 mb-5"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="card shadow-lg border-0 bg-primary text-white">
              <div className="card-header bg-transparent">
                <h3 className="fs-4 fw-bold text-white">Premium</h3>
              </div>
              <div className="card-body">
                <h4 className="display-6 text-white">$29</h4>
                <p className="fs-5">Per month</p>
                <ul className="list-unstyled my-4">
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-white me-2"></i>
                    Unlimited CV Templates
                  </li>
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-white me-2"></i>
                    Download in All Formats
                  </li>
                  <li className="mb-3">
                    <i className="fa-solid fa-check text-white me-2"></i>
                    24/7 Support
                  </li>
                </ul>
                <a href="#" className="btn btn-outline-light btn-block">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Crea8CV />
      <MainContent />
      <PricingSection />
      <Footer />
    </>
  );
};

export default Home;
