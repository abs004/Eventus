import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}