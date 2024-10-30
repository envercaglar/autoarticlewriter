import React from 'react';
import { Github, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 shadow-md mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a
              href="https://www.envercaglar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Globe className="h-5 w-5 mr-2" />
              www.ENVERCAGLAR.COM
            </a>
            <a
              href="https://github.com/envercaglar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="text-sm">
              © {new Date().getFullYear()} Enver Çağlar Coder. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}