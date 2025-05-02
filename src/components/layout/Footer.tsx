import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              © 2025 FarmForge. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-gray-400 hover:text-gray-500"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-gray-500"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;