import React from "react";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-[#4A6FFF]">JTEXT</span> Works
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Connecting with friends and making new connections has never been
            easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          {/* <!-- Connection Line --> */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4A6FFF] to-[#6CD9CC] transform -translate-x-1/2 z-0"></div>

          {/* <!-- Step 1 --> */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 md:mb-24 animate__animated animate__fadeInLeft">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block">
                <h3 className="text-2xl font-bold mb-3 text-[#4A6FFF]">
                  Step 1: Sign Up
                </h3>
                <p className="text-gray-300">
                  Create your JTEXT account in seconds. Use your email or phone
                  number to register and set up your profile with a photo and
                  short bio.
                </p>
              </div>
            </div>
            <div className="md:w-20 flex justify-center">
              <div className="w-12 h-12 bg-[#4A6FFF] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-neutral-900">
                1
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              {/* <div className="bg-neutral-800 p-6 rounded-xl shadow-lg md:hidden inline-block mb-8">
              <div className="w-full h-48 bg-neutral-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div> */}
              <div className=" md:block relative">
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="bg-neutral-900 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold mb-3">
                        Create Your Account
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm mb-1 text-gray-400">
                            Username
                          </label>
                          <div className="bg-neutral-700 p-2 rounded">
                            johndoe
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-400">
                            Email
                          </label>
                          <div className="bg-neutral-700 p-2 rounded">
                            john.doe@example.com
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-400">
                            Password
                          </label>
                          <div className="bg-neutral-700 p-2 rounded">
                            ••••••••
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-[#4A6FFF] py-2 rounded-lg font-semibold">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Step 2 --> */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 md:mb-24 animate__animated animate__fadeInRight">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 order-1 md:order-1 text-center md:text-left">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block">
                <h3 className="text-2xl font-bold mb-3 text-[#FF6B6B]">
                  Step 2: Discover Users
                </h3>
                <p className="text-gray-300">
                  Browse through user profiles and discover people you know. You
                  can search for specific users or browse recommendations based
                  on your connections.
                </p>
              </div>
            </div>
            <div className="md:w-20 flex justify-center order-2 md:order-2">
              <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-neutral-900">
                2
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-right order-3 md:order-3">
              {/* <div className="bg-neutral-800 p-6 rounded-xl shadow-lg md:hidden inline-block mb-8">
              <div className="w-full h-48 bg-neutral-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div> */}
              <div className=" md:block relative">
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-neutral-700 rounded-full flex-1 p-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="text-gray-400">Search users...</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-neutral-700 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#4A6FFF] flex items-center justify-center text-white font-bold">
                            S
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Sarah Johnson</p>
                            <p className="text-sm text-gray-400">Online</p>
                          </div>
                        </div>
                        <button className="bg-[#4A6FFF] px-3 py-1 rounded text-sm">
                          Add
                        </button>
                      </div>
                      <div className="bg-neutral-700 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold">
                            M
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Mike Stevens</p>
                            <p className="text-sm text-gray-400">
                              Last seen 2h ago
                            </p>
                          </div>
                        </div>
                        <button className="bg-[#4A6FFF] px-3 py-1 rounded text-sm">
                          Add
                        </button>
                      </div>
                      <div className="bg-neutral-700 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#6CD9CC] flex items-center justify-center text-white font-bold">
                            A
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Alex Wong</p>
                            <p className="text-sm text-gray-400">Online</p>
                          </div>
                        </div>
                        <button className="bg-[#4A6FFF] px-3 py-1 rounded text-sm">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Step 3 --> */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 md:mb-24 animate__animated animate__fadeInLeft">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block">
                <h3 className="text-2xl font-bold mb-3 text-[#6CD9CC]">
                  Step 3: Send Friend Requests
                </h3>
                <p className="text-gray-300">
                  Send friend requests to users you'd like to connect with. Once
                  they accept your request, you'll be able to start
                  communicating with them directly.
                </p>
              </div>
            </div>
            <div className="md:w-20 flex justify-center">
              <div className="w-12 h-12 bg-[#6CD9CC] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-neutral-900">
                3
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              {/* <div className="bg-neutral-800 p-6 rounded-xl shadow-lg md:hidden inline-block mb-8">
              <div className="w-full h-48 bg-neutral-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div> */}
              <div className=" md:block relative">
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-4">
                      Friend Request Sent
                    </h4>
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
              </div>
            </div>
          </div>

          {/* <!-- Step 4 --> */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 md:mb-24 animate__animated animate__fadeInRight">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 order-1 md:order-1 text-center md:text-left">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block">
                <h3 className="text-2xl font-bold mb-3 text-[#4A6FFF]">
                  Step 4: Start Chatting
                </h3>
                <p className="text-gray-300">
                  Once connected, you can start chatting immediately. Send text
                  messages, emojis, images, and more. Your conversations are
                  private and secure.
                </p>
              </div>
            </div>
            <div className="md:w-20 flex justify-center order-2 md:order-2">
              <div className="w-12 h-12 bg-[#4A6FFF] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-neutral-900">
                4
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-right order-3 md:order-3">
              {/* <div className="bg-neutral-800 p-6 rounded-xl shadow-lg md:hidden inline-block mb-8">
              <div className="w-full h-48 bg-neutral-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div> */}
              <div className=" md:block relative">
                <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-neutral-800 rounded-lg">
                    <div className="p-3 border-b border-neutral-700 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold">
                        E
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">Emma Wilson</p>
                        <p className="text-xs text-gray-400">Online</p>
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <button className="p-1 rounded-full hover:bg-neutral-700 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#4A6FFF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </button>
                        <button className="p-1 rounded-full hover:bg-neutral-700 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#4A6FFF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-3 h-56 overflow-y-auto">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex-shrink-0 flex items-center justify-center text-white font-bold">
                            E
                          </div>
                          <div className="ml-2 bg-neutral-700 rounded-lg p-2 max-w-[70%]">
                            <p className="text-sm">
                              Hey there! Thanks for adding me!
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start justify-end">
                          <div className="mr-2 bg-[#4A6FFF] rounded-lg p-2 max-w-[70%]">
                            <p className="text-sm">
                              Hi Emma! Great to connect with you!
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#6CD9CC] flex-shrink-0 flex items-center justify-center text-white font-bold">
                            Y
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex-shrink-0 flex items-center justify-center text-white font-bold">
                            E
                          </div>
                          <div className="ml-2 bg-neutral-700 rounded-lg p-2 max-w-[70%]">
                            <p className="text-sm">
                              Would you like to video chat sometime?
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start justify-end">
                          <div className="mr-2 bg-[#4A6FFF] rounded-lg p-2 max-w-[70%]">
                            <p className="text-sm">
                              Absolutely! That sounds great 😊
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#6CD9CC] flex-shrink-0 flex items-center justify-center text-white font-bold">
                            Y
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-neutral-700 flex items-center">
                      <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
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
                      <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="ml-2 flex-1 bg-neutral-700 border-0 rounded-full py-2 px-4 focus:outline-none text-white"
                      />
                      <button className="ml-2 p-2 bg-[#4A6FFF] rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
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
            </div>
          </div>

          {/* <!-- Step 5 --> */}
          <div className="relative z-10 flex flex-col md:flex-row items-center animate__animated animate__fadeInLeft">
  {/* Left Side: Description */}
  <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0 text-center md:text-right">
    <div className="bg-neutral-800 p-6 rounded-xl shadow-lg inline-block w-11/12 md:w-full">
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#FF6B6B]">
        Step 5: Video & Voice Calls
      </h3>
      <p className="text-gray-300 text-sm md:text-base">
        Take your conversations to the next level with high-quality video and voice calls. Connect face-to-face with friends no matter where they are.
      </p>
    </div>
  </div>

  {/* Step Number */}
  <div className="w-14 h-14 md:w-16 md:h-16 flex justify-center items-center">
    <div className="w-full h-full bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg border-4 border-neutral-900">
      5
    </div>
  </div>

  {/* Right Side: Video Call UI */}
  <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
    <div className="relative">
      <div className="bg-neutral-700 p-1 rounded-xl overflow-hidden shadow-lg w-11/12 md:w-full mx-auto">
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
              <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Call Info */}
          <div className="text-center text-xs md:text-sm text-gray-300">
            <p>Video call with Emma Wilson</p>
            <p>Duration: 00:07:45</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>

        <div className="mt-20 text-center">
          <a
            href="#download"
            className="inline-flex items-center px-8 py-4 bg-[#4A6FFF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3A5FEF] transition duration-300 animate__animated animate__pulse animate__infinite animate__slower"
          >
            <span>Start Connecting Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
