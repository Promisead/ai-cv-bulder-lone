import React, { useEffect } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Home.css";
import bannerImage from '../assets/image/banner.jpg';


const Crea8CV = () => {
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    navigate(to);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
       <header className="relative" data-aos="fade-down">
        {/* Navbar */}
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto flex items-center justify-between px- py-4">
            <a
              href="#"
              className="flex items-center text-blue-500 font-bold text-2xl"
            >
              <FaFileInvoice className="mr-2" />
              <span>Crea8 CV</span>
            </a>
            <button
              className="text-gray-700 lg:hidden focus:outline-none"
              aria-label="Toggle navigation"
            >
              <span className="material-icons">menu</span>
            </button>
            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative group" data-aos="fade-left">
                <button className="text-blue-500 font-medium">
                  Resume Templates
                </button>
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-md py-2 mt-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Job CV
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Academic CV
                  </a>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigateHandler("login")}
                data-aos="fade-left"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Banner Section */}
       
     
        <section
      className="bg-blue-500 text-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImage})` }}
      data-aos="fade-up"
    >

<div
    className="absolute inset-0  bg-blue-500 sm:bg-transparent sm:from-blue-900/95 sm:to-blue-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
      Build your professional CV in just 5   minutes!

       
      </h1>

     
      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="#"
          className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          onClick={() => navigateHandler("signup")}
          data-aos="fade-up"
        >
          Get Started
        </a>

        <a
          href="#"
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
          onClick={() => navigateHandler("signup")}
          data-aos="fade-up"
        
        
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
</header>
    </>
 
  
  );
};

const MainContent = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main>
      {/* Steps Section */}
      <section
        className="bg-gradient-to-r from-gray-100 to-white py-12"
        data-aos="fade-up"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Your Perfect Resume in Simple Steps
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Effortlessly create a job-worthy resume and cover letter that gets
            you hired faster, with a user-friendly experience.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full mb-4">
                <a href="/template">
                  <i className="fas fa-layer-group text-xl"></i>
                </a>
              </div>
              <h3 className="text-lg font-bold">Choose Your Template</h3>
              <p className="text-gray-600 mt-2">
                Select from a variety of professional templates and colors to
                create a standout resume.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full mb-4">
                <a href="form.html">
                  <i className="fas fa-file-alt text-xl"></i>
                </a>
              </div>
              <h3 className="text-lg font-bold">Place Your Information</h3>
              <p className="text-gray-600 mt-2">
                Fill in your details and track your CV with a real-time preview.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full mb-4">
                <i className="fas fa-download text-xl"></i>
              </div>
              <h3 className="text-lg font-bold">Download Instantly</h3>
              <p className="text-gray-600 mt-2">
                Instantly download your resume in PDF format and share via a
                link.
              </p>
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
      className="pt-5 bg-gradient-to-r from-blue-600 to-blue-700 text-gray-900"
      data-aos="fade-up"
    >
      <div className="container mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <div className="flex items-center text-white text-2xl font-bold">
              <FaFileInvoice className="mr-2" />
              <span>Crea8 CV</span>
            </div>
            <p className="text-gray-300 text-lg">
              Our resume builder helps you create your perfect resume, 100%
              free.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-white text-2xl transition-colors hover:text-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white text-2xl transition-colors hover:text-gray-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white text-2xl transition-colors hover:text-gray-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Company</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Community</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Podcast
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Support</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Subscribe</h5>
            <p className="text-gray-300 text-lg mb-4">
              Get the latest updates right in your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                className="w-full rounded-l-full px-4 py-2 text-gray-900 focus:outline-none"
                placeholder="Email address"
              />
              <button className="bg-blue-500 text-white rounded-r-full px-6 py-2 hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-blue-800 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <small className="text-gray-400 text-sm">
            © 2024 Crea8 CV. All Rights Reserved.
          </small>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Terms of Use
            </a>
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
    <section id="pricing" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-blue-600">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 mt-3">
            Select the perfect plan that suits your needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Basic Plan */}
          <div
            className="max-w-sm bg-blue-600 text-white shadow-lg rounded-lg p-6"
            data-aos="fade-up"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold">Basic</h3>
            </div>
            <div className="text-center mb-6">
              <h4 className="text-5xl font-bold">$9</h4>
              <p className="text-lg">Per month</p>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> 5 CV Templates
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Download in PDF
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Email Support
              </li>
            </ul>
            <a
              href="#"
              className="block w-full bg-white text-blue-600 py-2 rounded-lg font-semibold text-center"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div
            className="max-w-sm bg-white text-blue-600 shadow-lg rounded-lg p-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold">Pro</h3>
            </div>
            <div className="text-center mb-6">
              <h4 className="text-5xl font-bold">$19</h4>
              <p className="text-lg text-gray-500">Per month</p>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> 15 CV Templates
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Download in PDF and Word
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Priority Email Support
              </li>
            </ul>
            <a
              href="#"
              className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-center"
            >
              Get Started
            </a>
          </div>

          {/* Premium Plan */}
          <div
            className="max-w-sm bg-primary text-white shadow-lg rounded-lg p-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold">Premium</h3>
            </div>
            <div className="text-center mb-6">
              <h4 className="text-5xl font-bold">$29</h4>
              <p className="text-lg">Per month</p>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Unlimited CV Templates
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> Download in All Formats
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check"></i> 24/7 Support
              </li>
            </ul>
            <a
              href="#"
              className="block w-full bg-white text-blue-600 py-2 rounded-lg font-semibold text-center"
            >
              Get Started
            </a>
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
