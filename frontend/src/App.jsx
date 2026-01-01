import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from './pages/EntryPage';
import IndexPage from './pages/IndexPage';
import SearchResults from "./pages/SearchResults";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/wiki/:title" element={<EntryPage/>} />
        <Route path="/search" element={<SearchResults/>} />
        <Route path="/new" element={<NewPage/>} />
        <Route path="/edit/:title" element={<EditPage/>} />
      </Routes>
    </Router>
  );
}
export default App
