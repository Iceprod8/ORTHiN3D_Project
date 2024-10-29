import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { Logo, LogoIcon, Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { IconSettings, IconUserBolt, IconHome, IconLogout, IconListSearch } from "@tabler/icons-react";
import ProtectedRoute from './context/protectedRoute';
import { UserContext } from './context/userContext';
import { cn } from "./libs/utils";
import './App.css';

import Home from './pages/home.js';
import Register from './pages/register.js';
import RecordList from './pages/recordList.js';
import Login from './pages/login.js';
import Settings from './pages/settings';
import Error404 from './pages/404.js';

export default function App() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(UserContext);

    const RedirectIfAuthenticated = ({ children }) => user ? <Navigate to="/" /> : children;

    const linksLog = [
        { label: "Accueil", href: "/", icon: <IconHome className="text-white h-5 w-5" /> },
        { label: "Records", href: "/record-list", icon: <IconListSearch className="text-white h-5 w-5" /> },
        { label: "Paramètres", href: "/parametres", icon: <IconSettings className="text-white h-5 w-5" /> },
        { label: "Déconnexion", icon: <IconLogout className="text-white h-5 w-5" />, href: "/connexion", func: () => logout() }
    ];

    const linksNotLog = [
        { label: "Accueil", href: "/", icon: <IconHome className="text-white h-5 w-5" /> },
        { label: "Records", href: "/record-list", icon: <IconListSearch className="text-white h-5 w-5" /> },
        { label: "Connexion", href: "/connexion", icon: <IconUserBolt className="text-white h-5 w-5" /> }
    ];

    return (
        <Router>
            <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen h-screen flex-1 mx-auto overflow-hidden")}>
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {(user ? linksLog : linksNotLog).map((link, idx) => <SidebarLink key={idx} link={link} />)}
                            </div>
                        </div>
                    </SidebarBody>
                </Sidebar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inscription" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
                    <Route path="/connexion" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
                    <Route path="/record-list" element={<ProtectedRoute><RecordList /></ProtectedRoute>} />
                    <Route path="/parametres" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </Router>
    );
}
