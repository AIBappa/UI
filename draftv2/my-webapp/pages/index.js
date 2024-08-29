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
