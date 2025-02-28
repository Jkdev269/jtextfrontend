import React, { useState }  from 'react'

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="header" className="bg-neutral-900 text-white">
    <nav className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-bold flex items-center">
          <span className="text-white mr-1">J</span>
          <span className="text-[#4A6FFF]">TEXT</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="#hero"
              className="hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="hover:text-[#4A6FFF] transition-colors duration-300"
            >
              How It Works
            </a>
          </li>
          {/* <li>
            <a href="#user-showcase" className="hover:text-[#4A6FFF] transition-colors duration-300">
              Users
            </a>
          </li> */}
          {/* <li>
            <a href="#testimonials" className="hover:text-[#4A6FFF] transition-colors duration-300">
              Testimonials
            </a>
          </li> */}
          <li>
            <a
              href="#faq"
              className="hover:text-[#4A6FFF] transition-colors duration-300"
            >
              FAQ
            </a>
          </li>
          {/* <li>
            <a href="#download" className="hover:text-[#4A6FFF] transition-colors duration-300">
              Download
            </a>
          </li> */}
          <li>
            <a
              href="#contact"
              className="hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Contact
            </a>
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
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden mt-4`}
      >
        <ul className="space-y-2">
          <li>
            <a
              href="#hero"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#user-showcase"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Users
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#download"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Download
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block py-2 hover:text-[#4A6FFF] transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  )
}

export default Header