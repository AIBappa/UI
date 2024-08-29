import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="text-white px-4 py-2 bg-blue-500 rounded">Button1</button>
          <button className="text-white px-4 py-2 bg-green-500 rounded">Button2</button>
        </div>
        <a href="#" className="text-white">Account</a>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 p-4 text-white text-center">
        Footer content
      </footer>
    </div>
  );
};

export default Layout;
