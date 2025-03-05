import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 md:py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate__animated animate__fadeIn">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            How <span className="text-[#4A6FFF]">JTEXT</span> Works
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Connecting with friends and making new connections has never been
            easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4A6FFF] to-[#6CD9CC] transform -translate-x-1/2 z-0"></div>

          {/* Step Components */}
          {[
            {
              number: 1,
              color: "#4A6FFF",
              title: "Sign Up",
              description: "Create your JTEXT account in seconds. Use your email or phone number to register and set up your profile with a photo and short bio.",
              renderRight: () => (
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="bg-neutral-900 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold mb-3">Create Your Account</h4>
                      <div className="space-y-3">
                        {["Username", "Email", "Password"].map((label) => (
                          <div key={label}>
                            <label className="block text-sm mb-1 text-gray-400">{label}</label>
                            <div className="bg-neutral-700 p-2 rounded">
                              {label === "Username" ? "johndoe" : 
                               label === "Email" ? "john.doe@example.com" : 
                               "••••••••"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-[#4A6FFF] py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                      Sign Up
                    </button>
                  </div>
                </div>
              )
            },
            {
              number: 2,
              color: "#FF6B6B",
              title: "Discover Users",
              description: "Browse through user profiles and discover people you know. You can search for specific users or browse recommendations based on your connections.",
              renderRight: () => (
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-neutral-700 rounded-full flex-1 p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-400">Search users...</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Sarah Johnson", status: "Online", color: "#4A6FFF" },
                        { name: "Mike Stevens", status: "Last seen 2h ago", color: "#FF6B6B" },
                        { name: "Alex Wong", status: "Online", color: "#6CD9CC" }
                      ].map((user) => (
                        <div key={user.name} className="bg-neutral-700 p-3 rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full bg-[${user.color}] flex items-center justify-center text-white font-bold`}>
                              {user.name[0]}
                            </div>
                            <div className="ml-3">
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-sm text-gray-400">{user.status}</p>
                            </div>
                          </div>
                          <button className="bg-[#4A6FFF] px-3 py-1 rounded text-sm">Add</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            },
            {
              number: 3,
              color: "#6CD9CC",
              title: "Send Friend Requests",
              description: "Send friend requests to users you'd like to connect with. Once they accept your request, you'll be able to start communicating with them directly.",
              renderRight: () => (
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-4">Friend Request Sent</h4>
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold text-2xl">
                          E
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-semibold">Emma Wilson</p>
                          <p className="text-sm text-gray-400">@emma_wilson</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-neutral-900 rounded-lg text-center">
                        <p className="text-sm text-gray-300">
                          Friend request sent. Waiting for Emma to accept.
                        </p>
                      </div>
                      <div className="mt-4 text-center">
                        <button className="text-[#FF6B6B] text-sm">
                          Cancel Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            },
            {
              number: 4,
              color: "#4A6FFF",
              title: "Start Chatting",
              description: "Once connected, you can start chatting immediately. Send text messages, emojis, images, and more. Your conversations are private and secure.",
              renderRight: () => (
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg">
                    {/* Chat Header */}
                    <div className="p-3 border-b border-neutral-700 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold">E</div>
                      <div className="ml-3">
                        <p className="font-semibold">Emma Wilson</p>
                        <p className="text-xs text-gray-400">Online</p>
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <button className="p-1 rounded-full hover:bg-neutral-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4A6FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </button>
                        <button className="p-1 rounded-full hover:bg-neutral-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4A6FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-3 h-56 overflow-y-auto">
                      <div className="flex flex-col space-y-3">
                        {[
                          { sender: "E", message: "Hey there! Thanks for adding me!", align: "start" },
                          { sender: "Y", message: "Hi Emma! Great to connect with you!", align: "end" },
                          { sender: "E", message: "Would you like to video chat sometime?", align: "start" },
                          { sender: "Y", message: "Absolutely! That sounds great 😊", align: "end" }
                        ].map((msg, index) => (
                          <div key={index} className={`flex items-start ${msg.align === 'end' ? 'justify-end' : ''}`}>
                            {msg.align === 'start' && (
                              <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold">
                                {msg.sender}
                              </div>
                            )}
                            <div className={`${msg.align === 'start' ? 'ml-2 bg-neutral-700' : 'mr-2 bg-[#4A6FFF]'} rounded-lg p-2 max-w-[70%]`}>
                              <p className="text-sm">{msg.message}</p>
                            </div>
                            {msg.align === 'end' && (
                              <div className="w-8 h-8 rounded-full bg-[#6CD9CC] flex items-center justify-center text-white font-bold">
                                {msg.sender}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-neutral-700 flex items-center">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="ml-2 flex-1 bg-neutral-700 border-0 rounded-full py-2 px-4 focus:outline-none text-white w-full"
                      />
                      <button className="ml-2 p-2 bg-[#4A6FFF] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            },
            {
              number: 5,
              color: "#FF6B6B",
              title: "Video & Voice Calls",
              description: "Take your conversations to the next level with high-quality video and voice calls. Connect face-to-face with friends no matter where they are.",
              renderRight: () => (
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    {/* Video Call Frame */}
                    <div className="aspect-video bg-neutral-900 rounded-lg mb-4 relative overflow-hidden">
                      {/* Main User Video */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold text-3xl md:text-4xl">
                          E
                        </div>
                      </div>

                      {/* Self Video Preview */}
                      <div className="absolute bottom-4 right-4 w-1/4 h-1/4 md:w-20 md:h-28 lg:w-24 lg:h-32 bg-neutral-800 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-[#6CD9CC]">
                          <span className="text-white font-bold text-sm md:text-base">
                            You
                          </span>
                        </div>
                      </div>

                      {/* Call Controls */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                        {[
                          { 
                            icon: (className) => (
                              <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                              </svg>
                            ), 
                            color: "neutral-700" 
                          },
                          { 
                            icon: (className) => (
                              <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            ), 
                            color: "neutral-700" 
                          },
                          { 
                            icon: (className) => (
                              <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ), 
                            color: "red-500" 
                          }
                        ].map((control, index) => (
                          <button 
                            key={index} 
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-${control.color} flex items-center justify-center`}
                          >
                            {control.icon("h-4 w-4 md:h-5 md:w-5 text-white")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Video Call Info */}
                    <div className="text-center text-xs md:text-sm text-gray-300">
                      <p>Video call with Emma Wilson</p>
                      <p>Duration: 00:07:45</p>
                    </div>
                  </div>
                </div>
              )
            }
          ].map((step, index) => (
            <div 
              key={step.number} 
              className={`relative z-10 flex flex-col md:flex-row items-center mb-16 md:mb-24 
                ${index % 2 === 0 ? 'animate__animated animate__fadeInLeft' : 'animate__animated animate__fadeInRight'}
              `}
            >
              {/* Left Section - Description */}
              <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right">
                <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block">
                  <h3 className={`text-2xl font-bold mb-3 text-[${step.color}]`}>
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>

              {/* Step Number Indicator */}
              <div className="w-full md:w-20 flex justify-center items-center mb-4 md:mb-0">
                <div 
                  className={`w-12 h-12 bg-[${step.color}] rounded-full flex items-center justify-center 
                    text-white font-bold text-xl shadow-lg border-4 border-neutral-900`}
                >
                  {step.number}
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
                {step.renderRight()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to={"/loginpage"}
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-[#4A6FFF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3A5FEF] transition duration-300 animate__animated animate__pulse animate__infinite animate__slower"
          >
            <span className="text-sm md:text-base">Start Connecting Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;