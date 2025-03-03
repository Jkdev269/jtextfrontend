import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* <!-- Logo and Description --> */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-3xl font-bold text-white flex items-center mb-4"
            >
              <span className="text-white mr-1">J</span>
              <span className="text-[#4A6FFF]">TEXT</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              JTEXT connects people through seamless communication. Send
              messages, make video calls, and share moments with friends around
              the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/15oh5EXeRL/"
                target="_blank"
                className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="https://x.com/jaharuddin269?t=LMy0onNNCnqmuR05x-aEoQ&s=09"
                target="_blank"
                className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                aria-label="X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.06 2H21L14.63 10.09L22 21.94H15.62L10.92 14.88L5.32 21.94H1.35L8.12 13.27L1 2H7.55L11.8 8.43L17.06 2ZM15.92 19.77H17.91L6.45 3.99H4.3L15.92 19.77Z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/jk269_00?igsh=ajdmemVoZHNpcTU5"
                target="_blank"
                className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/jaharuddin-khan-990444319/"
                target="_blank"
                className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <AnchorLink
                  href="#hero"
                  className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                >
                  Home
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href="#features"
                  className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                >
                  Features
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href="#how-it-works"
                  className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                >
                  How It Works
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href="#faq"
                  className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                >
                  FAQ
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href="#contact"
                  className="text-gray-400 hover:text-[#4A6FFF] transition-colors"
                >
                  Contact
                </AnchorLink>
              </li>
            </ul>
          </div>

          {/* <!-- Contact --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-400">jaharuddin269@gmail.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-400">+91 8808761375</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <address className="text-gray-400 not-italic">
                  Gorakhpur Uttar Pradesh, India{" "}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Bottom --> */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; 2025 JTEXT. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-[#4A6FFF] transition-colors"
              >
                Terms
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#4A6FFF] transition-colors"
              >
                Privacy
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#4A6FFF] transition-colors"
              >
                Cookies
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#4A6FFF] transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Back to Top Button --> */}
        <div className="flex justify-center mt-8">
          <AnchorLink
            href="#hero"
            className="inline-flex items-center justify-center p-3 bg-[#4A6FFF] rounded-full shadow-lg hover:bg-[#3A5FEF] transition-colors"
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </AnchorLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
