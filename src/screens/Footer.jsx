import React from 'react'
import { FaFileInvoice } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <div>
      <footer
      className="pt-5 bg-gradient-to-r from-blue-600 to-blue-700 text-gray-900"
      data-aos="fade-up"
    >
      <div className="container mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <div className="navbar-brand flex items-center text-white text-2xl font-bold">
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
    </div>
  )
}

export default Footer
