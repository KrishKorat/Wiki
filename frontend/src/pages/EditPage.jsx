import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import {getEntryByTitle, updateEntry} from "../api/entries";


export default function EditPage() {
    const {title} = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadEntry() {
            try {
                setLoading(true);
                const response = await getEntryByTitle(title);
                setContent(response.data.content);
            }
            catch(err) {
                console.log("Error: ", err);
                setError("Entry not found");
            }
            finally {
                setLoading(false);
            }
        }
        loadEntry();
    }, [title]);


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await updateEntry(title, {content});
            navigate(`/wiki/${title}`);
        }
        catch(err) {
            console.log("Error: ", err);
            setError("Failed to save changes");
        }
    }


    if (loading) {
        return(
            <Layout>
                <p className="text-purple-700">Loading...</p>
            </Layout>
        );
    }

    if (error) {
        return(
            <Layout>
                <div className="bg-purple-100 text-purple-800 p-6 rounded-xl">
                    {error}
                </div>
            </Layout>
        );
    }


    return(
        <Layout>
            <div className="max-w-3xl bg-white p-8 rounded-xl shadow border border-purple-200">
                <h1 className="text-3xl font-bold text-purple-700 mb-6">
                    Edit Page - {title}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <textarea 
                        rows="14"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/wiki/${title}`)}
                            className="bg-purple-200 hover:bg-purple-300 text-purple-900 px-6 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}