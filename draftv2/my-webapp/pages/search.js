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
