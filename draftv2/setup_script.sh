#!/bin/bash

# Set project root directory
PROJECT_ROOT="my-webapp"

# Create the root directory
mkdir -p $PROJECT_ROOT

# Create directories
mkdir -p $PROJECT_ROOT/components
mkdir -p $PROJECT_ROOT/pages/api
mkdir -p $PROJECT_ROOT/public/images
mkdir -p $PROJECT_ROOT/styles

# Create and populate files

# components/Layout.js
cat <<EOL > $PROJECT_ROOT/components/Layout.js
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
EOL

# components/Map.js
cat <<EOL > $PROJECT_ROOT/components/Map.js
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ setSelectedMarker }) => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = [
      { id: 1, name: 'Marker 1', lat: 51.505, lng: -0.09, image: 'image1.jpg', description: 'Description 1' },
      { id: 2, name: 'Marker 2', lat: 51.51, lng: -0.1, image: 'image2.jpg', description: 'Description 2' },
    ];

    markers.forEach(marker => {
      const markerInstance = L.marker([marker.lat, marker.lng]).addTo(map);
      markerInstance.on('click', () => {
        setSelectedMarker(marker);
      });
    });

    return () => {
      map.remove();
    };
  }, [setSelectedMarker]);

  return (
    <div 
      id="map" 
      className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-lg shadow"
    />
  );
};

export default Map;
EOL

# pages/_app.js
cat <<EOL > $PROJECT_ROOT/pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
EOL

# pages/index.js
cat <<EOL > $PROJECT_ROOT/pages/index.js
import Layout from '../components/Layout';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false
});

export default function Home() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <Layout>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          onClick={() => window.location.href = '/search'}
        />
        <div className="my-4">
          <MapWithNoSSR setSelectedMarker={setSelectedMarker} />
        </div>
        <div className="relative border border-gray-300 rounded p-4">
          <button className="absolute top-0 right-0 p-2">▲</button>
          <div>
            <img src={selectedMarker?.image} alt="Item" className="w-full h-40 object-cover" />
            <h2 className="text-xl mt-2">{selectedMarker?.name}</h2>
            <p>{selectedMarker?.description}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button>◀</button>
            <button>▶</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 flex justify-between">
        <button className="flex-1 py-2 text-center">Tab 1</button>
        <button className="flex-1 py-2 text-center">Tab 2</button>
        <button className="flex-1 py-2 text-center">Tab 3</button>
        <button className="flex-1 py-2 text-center">Tab 4</button>
        <button className="flex-1 py-2 text-center">Tab 5</button>
      </div>
    </Layout>
  );
}
EOL

# pages/search.js
cat <<EOL > $PROJECT_ROOT/pages/search.js
import Layout from '../components/Layout';

export default function Search() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Search and Filters</h1>
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Filter 1</h2>
          <input type="checkbox" /> Option 1
          <br />
          <input type="checkbox" /> Option 2
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl mb-2">Filter 2</h2>
          <input type="radio" name="filter2" /> Option 1
          <br />
          <input type="radio" name="filter2" /> Option 2
        </div>
      </div>
    </Layout>
  );
}
EOL

# styles/globals.css
cat <<EOL > $PROJECT_ROOT/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# .dockerignore
cat <<EOL > $PROJECT_ROOT/.dockerignore
node_modules
npm-debug.log
.env
.DS_Store
.git
.gitignore
EOL

# .gitignore
cat <<EOL > $PROJECT_ROOT/.gitignore
node_modules
.next
.env
.DS_Store
EOL

# Dockerfile
cat <<EOL > $PROJECT_ROOT/Dockerfile
# Step 1: Use a Node.js image as the base
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]
EOL

# docker-compose.yml
cat <<EOL > $PROJECT_ROOT/docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - .:/app
      - /app/node_modules
    command: npm start
EOL

# next.config.js
cat <<EOL > $PROJECT_ROOT/next.config.js
module.exports = {
  reactStrictMode: true,
};
EOL

# package.json
cat <<EOL > $PROJECT_ROOT/package.json
{
  "name": "my-webapp",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "leaflet": "^1.7.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^2.0.0"
  }
}
EOL

# tailwind.config.js
cat <<EOL > $PROJECT_ROOT/tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOL

echo "Project structure with populated files created successfully in '$PROJECT_ROOT'."
