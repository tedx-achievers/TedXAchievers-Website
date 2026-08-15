

import { FaTiktok, FaInstagram } from 'react-icons/fa';

const App = () => {
  return (
    <div className="bg-stone-950 min-h-screen flex flex-col items-center text-center justify-center gap-5 p-4">
      <img src="/TEDX_Achievers_logo-white.png" alt="TEDxAchievers img" className='h-20 sm:h-50' />
      <p className="text-white text-3xl font-light">COMING SOON, <span className="font-bold text-red-500">ANTICIPATE</span> !</p>
      
      <div className="flex flex-col items-center gap-4 mt-6">
        <p className="text-white text-xl font-medium">Follow us on our socials</p>
        <div className="flex gap-6 text-lg">
          <a href="https://www.tiktok.com/@tedxachieversuniversity" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
            <FaTiktok className="text-2xl" /> TikTok
          </a>
          <a href="https://www.instagram.com/tedxachieversuniversity/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
            <FaInstagram className="text-2xl" /> Instagram
          </a>
        </div>
      </div>

      <div className="text-gray-400 text-base mt-8 space-y-2">
        <p>Then you can visit our website for timely updates.</p>
        <p>More updates coming soon</p>
      </div>
    </div>
  )
}

export default App