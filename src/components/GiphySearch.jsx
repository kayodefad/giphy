import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/apiService";

const GiphySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getData(searchTerm);
      setResult(res.data);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="mt-5 p-7">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2" htmlFor="search">
          Search Giphy
        </label>
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleChange}
          autoFocus
          className="border border-slate-300 rounded h-8 px-2 ring-0 outline-none w-[300px] max-w-full focus:border-green-500"
        />
        <button
          className="block mt-3 rounded bg-emerald-400 text-white px-7 py-2 text-sm disabled:opacity-80 disabled:cursor-not-allowed"
          disabled={!searchTerm.length}
          type="submit"
        >
          Search
        </button>
      </form>
      {error ? (
        <p>Unable to fetch data</p>
      ) : (
        <div className="mt-10 flex flex-wrap gap-5">
          {result.map((giphy, i) => {
            return (
              <img
                key={giphy.slug}
                className="contain w-[300px]"
                src={giphy.images.original.url}
                alt={giphy.title}
                onClick={() =>
                  navigate(`/${giphy.slug}`, { state: { data: giphy } })
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GiphySearch;
