import { Anchor } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    
    <section
          id="hero"
          className="bg-neutral-900 text-white min-h-[60vh] flex items-center"
        >
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 animate__animated animate__fadeInLeft">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  Connect and Chat with{" "}
                  <span className="text-[#4A6FFF]">JTEXT</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Experience seamless communication with real-time chat, video
                  calls, voice calls, and more. Connect with friends instantly
                  and express yourself with rich media sharing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/loginpage"
                    
                    className="px-6 py-3 bg-[#4A6FFF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3A5FEF] transition duration-300 animate__animated animate__pulse animate__infinite animate__slower"
                  >
                    Get Started Free
                  </Link>
                </div>
              
              </div>

              <div className="lg:w-1/2 relative animate__animated animate__fadeInRight">
                <div className="bg-neutral-800 p-4 rounded-2xl shadow-2xl border border-neutral-700 relative z-10 max-w-md mx-auto">
                  <div className="bg-neutral-800 rounded-t-lg p-2 flex items-center border-b border-neutral-700">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-sm font-medium">
                      JTEXT Messenger
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-900 rounded-b-lg">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#6CD9CC] flex-shrink-0 flex items-center justify-center text-white font-bold">
                          J
                        </div>
                        <div className="bg-neutral-800 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Hey there! How's it going?</p>
                          <p className="text-xs text-gray-400 mt-1">10:23 AM</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 self-end">
                        <div className="bg-[#4A6FFF] rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">
                            Hi! I'm doing great. Want to join our video call?
                          </p>
                          <p className="text-xs text-gray-300 mt-1">10:25 AM</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex-shrink-0 flex items-center justify-center text-white font-bold">
                          Y
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#6CD9CC] flex-shrink-0 flex items-center justify-center text-white font-bold">
                          J
                        </div>
                        <div className="bg-neutral-800 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Sure! Give me 5 minutes 😊</p>
                          <p className="text-xs text-gray-400 mt-1">10:26 AM</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-neutral-800 rounded-full px-4 py-2 mt-2">
                        <button className="text-gray-400 hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="bg-transparent border-0 focus:outline-none text-white mx-2 flex-1"
                        />
                        <button className="text-[#4A6FFF]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#4A6FFF]/20 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-8 -right-4 w-40 h-40 bg-[#FF6B6B]/20 rounded-full filter blur-xl"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-16 text-neutral-800"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-current"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-current"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-current"
              ></path>
            </svg>
          </div>
        </section>
  )
}

export default Hero