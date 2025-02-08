import { Outlet } from "react-router-dom";
import { MainNav } from "./components/navigation/main-nav";

export function App() {
    return (
        <main>
            <nav className="p-4">
                <MainNav />
            </nav>
            <Outlet />
        </main>
    );
}
