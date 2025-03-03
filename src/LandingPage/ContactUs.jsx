import React, { useState } from 'react'


function ContactUs() {
  const [formSuccessVisible, setFormSuccessVisible] = useState(false);

  return (
    <section id="contact" className="py-20 bg-neutral-800 text-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in <span className="text-[#4A6FFF]">Touch</span></h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Have questions or need support? Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* <!-- Contact Form --> */}
        <div className="lg:w-2/3 animate__animated animate__fadeInLeft">
          <div className="bg-neutral-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            <form id="contactForm" className="space-y-6" >  {/*  onSubmit={handleSubmit} */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" className="block text-gray-300 mb-2">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A6FFF] focus:border-transparent transition-colors" placeholder="John Doe" required/>
                </div>
                
                <div>
                  <label for="email" className="block text-gray-300 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A6FFF] focus:border-transparent transition-colors" placeholder="john@example.com" required/>
                </div>
              </div>
              
              <div>
                <label for="subject" className="block text-gray-300 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A6FFF] focus:border-transparent transition-colors" placeholder="How can we help you?" required/>
              </div>
              
              <div>
                <label for="message" className="block text-gray-300 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A6FFF] focus:border-transparent transition-colors" placeholder="Type your message here..." required></textarea>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="privacy" name="privacy" className="h-5 w-5 text-[#4A6FFF] focus:ring-[#4A6FFF] border-neutral-600 rounded" required/>
                <label for="privacy" className="ml-2 text-gray-300 text-sm">
                  I agree to the <a href="#" className="text-[#4A6FFF] hover:underline">Privacy Policy</a> and consent to being contacted.
                </label>
              </div>
              
              <div>
                <button type="submit" className="px-6 py-3 bg-[#4A6FFF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3A5FEF] transition duration-300 flex items-center">
                  <span>Send Message</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
            
              <div id="formSuccess" className={`${formSuccessVisible ? '' : 'hidden'} mt-6 bg-green-500/20 border border-green-500 text-green-400 rounded-lg p-4`}>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Thank you for your message! We'll get back to you shortly.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* <!-- Contact Info --> */}
        <div className="lg:w-1/3 animate__animated animate__fadeInRight">
          <div className="bg-neutral-700 rounded-xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-neutral-800 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4A6FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:support@jtext.com" className="text-gray-300 hover:text-[#4A6FFF] transition-colors">jaharuddin269@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neutral-800 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href="tel:+18001234567" className="text-gray-300 hover:text-[#4A6FFF] transition-colors">+91 8808761375</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neutral-800 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6CD9CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <span className="text-gray-300 not-italic">
                    Gorakhpur Uttar Pradesh, India
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* <!-- Social Media --> */}
          <div className="bg-neutral-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            
            <div className="flex flex-wrap gap-4">
              <a href="https://www.facebook.com/share/15oh5EXeRL/" target="_blank" className="bg-neutral-800 hover:bg-[#4A6FFF] p-3 rounded-full transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              
              <a href="https://x.com/jaharuddin269?t=LMy0onNNCnqmuR05x-aEoQ&s=09" target="_blank" className="bg-neutral-800 hover:bg-[#4A6FFF] p-3 rounded-full transition-colors" aria-label="X">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
         <path d="M17.06 2H21L14.63 10.09L22 21.94H15.62L10.92 14.88L5.32 21.94H1.35L8.12 13.27L1 2H7.55L11.8 8.43L17.06 2ZM15.92 19.77H17.91L6.45 3.99H4.3L15.92 19.77Z"/>
            </svg>
      </a>

              
              <a href="https://www.instagram.com/jk269_00?igsh=ajdmemVoZHNpcTU5" target="_blank" className="bg-neutral-800 hover:bg-[#4A6FFF] p-3 rounded-full transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a href="https://www.linkedin.com/in/jaharuddin-khan-990444319/" target="_blank" className="bg-neutral-800 hover:bg-[#4A6FFF] p-3 rounded-full transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Support Hours</h4>
              <p className="text-gray-300">Monday - Friday: 9AM - 8PM EST</p>
              <p className="text-gray-300">Saturday: 10AM - 6PM EST</p>
              <p className="text-gray-300">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  )
}

export default ContactUs
