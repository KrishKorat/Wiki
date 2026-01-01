import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../api/entries";
import Layout from "../components/Layout";


export default function NewPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if(!title.trim() || !content.trim()) {
            setError("Title and Content are required");
            return;
        }

        try {
            setLoading(true);
            const normalizedTitle = title.trim();
            await createEntry({
                title: normalizedTitle,
                content
            });

            navigate(`/wiki/${normalizedTitle}`);
        }
        catch(err) {
            if(err.response?.status === 409) {
                setError("An entry with this title already exists.");
            } else {
                setError("Failed to create page.");
            }
        }
        finally {
            setLoading(false);
        }
    }


    return(
        <Layout>
            <div className="max-w-3xl bg-white p-8 rounded-xl shadow border border-purple-200">
                <h1 className="text-3xl font-bold text-purple-700 mb-6">
                    Create New Page
                </h1>

                {
                    error && (
                        <div className="mb-4 bg-purple-100 text-purple-800 p-3 rounded-lg">
                            {error}
                        </div>
                    )
                }

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-purple-700 font-medium mb-1">
                            Title
                        </label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            placeholder="Page title"
                        />
                    </div>
                    {/* Content */}
                    <div>
                        <label className="block text-purple-700 font-medium mb-1">
                            Markdown Content
                        </label>
                        <textarea 
                            rows="12"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            placeholder="# Heading\n\nWrite your content in Markdown..."
                        />
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Page"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}