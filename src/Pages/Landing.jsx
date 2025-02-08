import React from 'react';
import Header from '../components/Header';
import DELLLogo from '../assets/DELLLogo.png';
import ZendeskLogo from '../assets/ZendeskLogo.png';
import RakutenLogo from '../assets/RakutenLogo.png';
import PFLogo from '../assets/PacificFundsLogo.png';
import NCRLogo from '../assets/NCRLogo.png';
import Lattice from '../assets/LatticeLogo.png';
import TEDLogo from '../assets/TEDLogo.png';

const LandingPage = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen max-w-full text-white flex flex-col">
      <Header onPricingClick={scrollToPricing} />
      <div className="min-h-scree text-white flex flex-col items-center justify-center p-6 mt-10">
        <header className="text-center mb-8">
          <p className="text-sm text-gray-400">We just closed $60M in Series B. Learn more</p>
          <h1 className="text-4xl font-bold mt-4">Student Affairs Office<br />ChatBot Support System</h1>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">Download the app</button>
            <button className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-700">Talk to an expert</button>
          </div>
        </header>

        <div className="relative max-w-sm w-full">
          <div className="bg-black rounded-3xl shadow-lg p-4 relative">
            <div className="bg-white rounded-xl p-4">
              <div className="text-center text-gray-600 text-sm mb-4">
                By chatting with us, you accept to our Terms and Conditions as well as our Privacy and Cookie Policies.
              </div>
              <div className="space-y-2">
                <button className="w-full border border-gray-300 rounded-md p-2 text-left">
                  How to claim confiscated ID
                  <div className="text-xs text-gray-500">Cause my ID is confiscated</div>
                </button>
                <button className="w-full border border-gray-300 rounded-md p-2 text-left">
                  Explain the rules in SAO
                  <div className="text-xs text-gray-500">I'm a new student here</div>
                </button>
                <button className="w-full border border-gray-300 rounded-md p-2 text-left">
                  What time do SAO open
                  <div className="text-xs text-gray-500">During weekdays</div>
                </button>
              </div>
              <div className="mt-4 flex items-center border rounded-md px-2 py-1">
                <input type="text" placeholder="Send a message..." className="flex-grow focus:outline-none text-black" />
                <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12l16.5-9-7.5 16.5-2.25-6.75L3.75 12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className='mt-10'>Trusted by teams at over 1,000 of the world's leading organizations</p>
        <div className="flex justify-center gap-6 mt-8">
                <img src={DELLLogo} alt="DELL Logo" className="w-8 h-2 rounded-lg" />
                <img src={ZendeskLogo} alt="Zendesk Logo" className="w-8 h-2 rounded-lg" />
                <img src={RakutenLogo} alt="Rakuten Logo" className="w-8 h-2 rounded-lg" />
                <img src={PFLogo} alt="Pacific Funds Logo" className="w-8 h-2 rounded-lg" />
                <img src={NCRLogo} alt="NCR Logo" className="w-8 h-2 rounded-lg" />
                <img src={Lattice} alt="Lattice Logo" className="w-8 h-2 rounded-lg" />
                <img src={TEDLogo} alt="TED Logo" className="w-8 h-2 rounded-lg" />
              </div>

        <section className="mt-30 text-center" id="pricing-section">
          <h2 className="text-3xl font-bold mb-4">Pricing and Plan</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Donec dignissim, odio ac imperdiet luctus, ante nisl accumsan justo, et venenatis ante metus pellentesque sem.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Monthly</button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md">Yearly</button>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-black text-white p-6 rounded-lg shadow-xl max-w-xs">
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-4xl font-bold mb-4">$10</p>
              <ul className="text-left space-y-2">
                <li>Nam sollicitudin dignissim</li>
                <li>Cras convallis lacus</li>
                <li>Quisque ut metus</li>
                <li>Vivamus sit amet</li>
                <li>Cras convallis lacus orci</li>
              </ul>
              <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md">Choose Plan</button>
            </div>

            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-w-xs">
              <h3 className="text-xl font-semibold mb-2">1000</h3>
              <p className="text-4xl font-bold mb-4">$50</p>
              <ul className="text-left space-y-2">
                <li>Nam sollicitudin dignissim</li>
                <li>Cras convallis lacus</li>
                <li>Quisque ut metus</li>
                <li>Vivamus sit amet</li>
                <li>Cras convallis lacus orci</li>
              </ul>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Choose Plan</button>
            </div>

            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-w-xs">
              <h3 className="text-xl font-semibold mb-2">5000</h3>
              <p className="text-4xl font-bold mb-4">$99</p>
              <ul className="text-left space-y-2">
                <li>Nam sollicitudin dignissim</li>
                <li>Cras convallis lacus</li>
                <li>Quisque ut metus</li>
                <li>Vivamus sit amet</li>
                <li>Cras convallis lacus orci</li>
              </ul>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Choose Plan</button>
            </div>
          </div>
        </section>
      </div>

  <footer className="mt-8 bg-gray-900 text-gray-400 text-sm p-6 w-full">
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col md:flex-row justify-center gap-20 w-full max-w-4xl">
        <div className="text-left">
        <h4 className="font-bold mb-2">Contact</h4>
        <p>Work inquiries: work@sass.com</p>
        <p>PR and speaking: press@sass.com</p>
        <p>New business: new.business@sass.com</p>

        <h4 className="font-bold mt-4 mb-2">Careers</h4>
        <p>Careers@sass.com</p>

        <div className="text-left mt-9 text-gray-500">
        <p>2024 SASS. All Rights Reserved.</p>
        </div>
      </div>

       <div className="text-left">
          <h4 className="font-bold mb-2">Address</h4>
         <p>3517 Saint Michael Road,</p>
         <p>Kasambagan, Cebu City</p>

         <h4 className="font-bold mt-4 mb-2">Social</h4>
          <p>Twitter</p>
         <p>Instagram</p>
         <p>TikTok</p>

         <div className="text-left mt-4 text-gray-500">
        <div className="flex gap-4">
         <p>Terms of Service</p>
         <p>Privacy Policy</p>
        </div>
      </div>
        </div>
      </div>
    </div>
  </footer>
</div>
  );
};

export default LandingPage;
