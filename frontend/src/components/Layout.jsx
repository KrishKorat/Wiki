import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return(
        <div className="flex bg-purple-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    );
}