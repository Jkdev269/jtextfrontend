import React from "react";
import Features from "./Features";
import Hero from "./Hero";
import Header from "./Header";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";

function JtextLandingPage() {
  
  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      <main className="flex-1 relative h-full">
        <Header/>
       <Hero/>
       <Features/>
       <HowItWorks/>
       <FAQ/>
      </main>
    </div>
  );
}

export default JtextLandingPage;
