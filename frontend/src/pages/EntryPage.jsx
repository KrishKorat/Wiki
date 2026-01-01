import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEntryByTitle } from "../api/entries";
import { marked } from "marked";
import Layout from "../components/Layout";
import { deleteEntry } from "../api/entries";



export default function EntryPage() {

  const {title} = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchEntry() {
      try {
        setLoading(true);
        const response = await getEntryByTitle(title);
        setEntry(response.data);
      }
      catch(err) {
        setError(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchEntry();
  }, [title]);


  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${entry.title}"? This action cannot be undone.`
    );
    if(!confirmed) return;

    try {
      await deleteEntry(entry.title);
      navigate("/");
    }
    catch(err) {
      alert("Failed to delete entry.");
    }
  }


  if(loading || !entry) {
    return(
    <Layout>
      <div className="flex justify-center items-center h-screen text-purple-700 text-xl">
        Loading...
      </div>
    </Layout>
    );
  }
  if(error) {
    return(
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-purple-100 text-purple-800 p-6 rounded-xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-3">404 Not Found</h2>
          <p className="mb-4">{error}</p>
          <a
            href="/"
            className="text-purple-700 font-semibold underline hover:text-purple-900"
          >
            Go back home
          </a>
        </div>
      </div>
    </Layout>
    );
  }




  return(
  <Layout>
    <div className="p-6 bg-white rounded-xl shadow-lg border border-purple-200">
      {/* Title */}
      <h1 className="text-4xl font-bold text-purple-700 mb-6 tracking-wide">
        {entry.title}
      </h1>

      <hr/>

      {/* Markdown Content */}
      <div
        className="prose prose-purple max-w-none mt-2"
        dangerouslySetInnerHTML={{ __html: marked.parse(entry.content) }}
      ></div>

      <div className="mt-10 flex gap-4">
        <a
          href={`/edit/${entry.title}`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
        >
          Edit Page
        </a>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Delete Page
        </button>

        <a
          href={`/`}
          className="bg-purple-200 hover:bg-purple-300 text-purple-900 px-5 py-2 rounded-lg" 
        >
          Back to Index
        </a>
      </div>
    </div>
  </Layout>
  );
}