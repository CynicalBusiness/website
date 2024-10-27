import { Outlet } from "react-router-dom";
import { MainNav } from "./components/navigation/main-nav";

export function App() {
    return (
        <main className="container mx-auto">
            <header>
                <MainNav />
            </header>
            <Outlet />
        </main>
    );
}
