import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { searchEntries, getAllEntries } from "../api/entries";


export default function SearchResults() {

    const { search } = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(search).get("q") || "";

    const [ results, setResults ] = useState([]);
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        async function runSearch() {
            try {
                setLoading(true);

                // Find the exact match
                const all = await getAllEntries();
                const exact = all.data.find(
                    (entry) => entry.title.toLowerCase() === query.toLowerCase()
                );
                if(exact) {
                    navigate(`/wiki/${exact.title}`);
                    return;
                }

                // Return matching results
                const response = await searchEntries(query);
                setResults(response.data);
                
            }
            catch(err) {
                console.log("Error :", err);
            }
            finally {
                setLoading(false);
            }
        }
        if(query) {
            runSearch();
        }
    }, [query, navigate]);


    return(
        <Layout>
            <h1 className="text-3xl font-bold text-purple-700 mb-6">
                Search Results for "{query}"
            </h1>

            {
                loading
                ? (
                    <p className="text-purple-600">Searching...</p>
                ) : results.length === 0 ? (
                    <p className="text-purple-600">No matching entries found.</p>
                ) : (
                    <ul className="space-y-4">
                        {
                            results.map((entry) => (
                                <li
                                    key={entry._id}
                                    className="bg-white p-5 rounded-xl shadow border border-purple-100"
                                >
                                    <Link
                                        to={`/wiki/${entry.title}`}
                                        className="text-xl font-semibold text-purple-800 hover:underline"
                                    >
                                        {entry.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </Layout>
    );
}