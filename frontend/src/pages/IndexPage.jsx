import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Layout from "../components/Layout";
import { getAllEntries } from "../api/entries";




export default function IndexPage() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchEntries() {
            try {
                const response = await getAllEntries();
                setEntries(response.data);
            }
            catch(err) {
                console.log("Error : ", err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchEntries();
    }, []);

    
    return(
        <Layout>
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
                Encyclopedia Entries
            </h1>
            {
                loading
                ? (
                    <p className="text-purple-600">Loading entries...</p>
                ) : (
                    <ul className="space-y-4">
                        {
                            entries.map((entry) => (
                                <li
                                    key={entry._id}
                                    className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-purple-100"
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