import { Outlet, link } from "react-router";

export default function MainLayout() {
    return (
        <div>
            <ul>
                <li><Link to="/home" className="text-blue-800 font-semibold">Головна</Link></li>
                <li><Link to="/students" className="text-blue-800 font-semibold">Студенти</Link></li>
            </ul>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
        
    )
}