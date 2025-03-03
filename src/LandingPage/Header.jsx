import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="header" className="bg-neutral-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <AnchorLink
            href="#hero"
            className="text-2xl font-bold flex items-center"
          >
            <span className="text-white mr-1">J</span>
            <span className="text-[#4A6FFF]">TEXT</span>
          </AnchorLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <AnchorLink
                href="#hero"
                className="hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Home
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#features"
                className="hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Features
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#how-it-works"
                className="hover:text-[#4A6FFF] transition-colors duration-300"
              >
                How It Works
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#faq"
                className="hover:text-[#4A6FFF] transition-colors duration-300"
              >
                FAQ
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#contact"
                className="hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Contact
              </AnchorLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden mt-4`}
        >
          <ul className="space-y-2">
            <li>
              <AnchorLink
                href="#hero"
                className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Home
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#features"
                className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Features
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#how-it-works"
                className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
              >
                How It Works
              </AnchorLink>
            </li>

            <li>
              <AnchorLink
                href="#faq"
                className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
              >
                FAQ
              </AnchorLink>
            </li>

            <li>
              <AnchorLink
                href="#contact"
                className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
              >
                Contact
              </AnchorLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
