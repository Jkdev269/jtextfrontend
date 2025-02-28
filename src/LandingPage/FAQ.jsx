import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the active FAQ item if clicked again
    } else {
      setActiveIndex(index); // Open the clicked FAQ item
    }
  };

  return (
    <section id="faq" className="py-20 bg-neutral-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-[#4A6FFF]">Questions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about JTEXT's features, functionality, and capabilities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Accordion */}
          <div className="faq-accordion space-y-4">
            {/* FAQ Item 1 */}
            <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(0)}
              >
                <span className="text-xl font-semibold">How do I find and add friends on JTEXT?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 0 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 0 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                    Finding and adding friends on JTEXT is simple! You can search for users by username, email, or phone number
                    using the search function. Once you find someone, click the "Add Friend" button to send a friend request. When
                    they accept, you'll be connected and can start chatting right away. You can also import contacts from your
                    device to find friends who are already using JTEXT.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(1)}
              >
                <span className="text-xl font-semibold">What types of files can I share through JTEXT?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 1 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 1 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                  JTEXT supports sharing of virtually all file types, including images, videos, documents, audio files, PDFs, and more. The free version allows sharing files up to 100MB in size, while Premium increases this limit to 1GB. Images and videos can be viewed directly in the chat, and common document types like PDFs and Office files can be previewed without having to download them first.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(2)}
              >
                <span className="text-xl font-semibold">How secure are my conversations on JTEXT?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 2 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 2 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                    Security is our top priority. All conversations on JTEXT are protected with end-to-end encryption, meaning
                    only you and the person you're communicating with can read what's sent. We cannot access your messages, and
                    they're never stored on our servers after delivery. Additionally, you can enable two-factor authentication
                    for your account and set up self-destructing messages for extra security.
                  </p>
                </div>
              )}
            </div>
            {/* FAQ Item 4 */}
            <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(3)}
              >
                <span className="text-xl font-semibold">What are the video and voice call quality requirements?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 3 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 3 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                  JTEXT is designed to work even on modest internet connections. For optimal video call quality, we recommend at least 1 Mbps upload and download speed. Voice calls require much less bandwidth, working well even on slow connections. Our adaptive technology automatically adjusts quality based on your connection, ensuring the best possible experience even when network conditions aren't ideal.
                  </p>
                </div>
              )}
            </div>
             {/* FAQ Item 5 */}
             <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(4)}
              >
                <span className="text-xl font-semibold">Is JTEXT free to use?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 4 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 4 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                  Yes, JTEXT's core features are completely free! You can send unlimited messages, make video and voice calls, share images, send emojis, and manage your contacts at no cost. We also offer a Premium subscription that adds extra features like increased file sharing limits, custom themes, advanced privacy controls, and priority support. However, everything you need for great communication is available in the free version.
                  </p>
                </div>
              )}
            </div>
            {/* FAQ Item 6 */}
            <div className="faq-item bg-neutral-700 rounded-xl overflow-hidden animate__animated animate__fadeIn">
              <button
                className="faq-question w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => toggleAnswer(5)}
              >
                <span className="text-xl font-semibold">Is JTEXT free to use?</span>
                <svg
                  className={`faq-icon w-6 h-6 transform transition-transform duration-300 ${activeIndex === 5 ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === 5 && (
                <div className="faq-answer px-6 pb-6">
                  <p className="text-gray-300">
                  Absolutely! Many businesses use JTEXT for internal and external communication. For professional use, we offer JTEXT Business with additional features like user management, centralized administration, compliance tools, integration with business software, and enhanced security options. Teams of all sizes appreciate our reliable service, high-quality calls, and intuitive interface for professional communication.
                  </p>
                </div>
              )}
            </div>

            {/* Add other FAQ items similarly */}

          </div>

          {/* More Questions */}
          <div className="mt-12 text-center animate__animated animate__fadeIn">
            <p className="text-lg mb-4">Still have questions? We're here to help!</p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-[#4A6FFF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3A5FEF] transition duration-300"
            >
              <span>Contact Support</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;