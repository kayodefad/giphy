import { Routes, Route } from "react-router-dom";
import GiphySearch from "./components/GiphySearch";
import GiphyDetails from "./components/GiphyDetails";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GiphySearch />} />
        <Route path=":id" element={<GiphyDetails />} />
      </Routes>
    </>
  );
}

export default App;
