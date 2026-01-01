import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { getRandomEntry } from "../api/entries";

export default function Sidebar() {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!query.trim()) return;

        navigate(`/search?q=${query.trim()}`);
        setQuery("");
    }


    async function handleRandom() {
        try {
            const response = await getRandomEntry();
            navigate(`/wiki/${response.data.title}`);
        }
        catch(err) {
            console.log("Error: ", err);
        }
    }


    return(
        <aside className="w-64 min-h-screen bg-purple-100 border-r border-purple-200 p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
                Wiki
            </h2>

            {/* Search box */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search encyclopedia..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full mb-6 px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </form>

            {/* Navigation */}
            <nav className="flex flex-col gap-4">
                <Link
                    to="/"
                    className="text-purple-700 font-medium hover:text-purple-900"
                >
                    Home
                </Link>
                <Link
                    to="/new"
                    className="text-purple-700 font-medium hover:text-purple-900"
                >
                    Create New Page
                </Link>
                <Link
                    onClick={handleRandom}
                    className="text-purple-700 font-medium hover:text-purple-900"
                >
                    Random Page
                </Link>
            </nav>
        </aside>
    );
}