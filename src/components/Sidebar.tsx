import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        
           
            <>
            
                <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                    <div className="sidebar-header">
                        <img className="img-fluid" src="logo.jpeg" />
                        <i className="fas fa-bars toggle-icon " onClick={toggleSidebar}></i>
                    </div>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#dashboard">
                                <i className="fas fa-tachometer-alt"></i>
                                <span className={isOpen ? "visible" : "hidden"}> Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#reports">
                                <i className="fas fa-chart-bar"></i>
                                <span className={isOpen ? "visible" : "hidden"}> Reports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#event-logs">
                                <i className="fas fa-clipboard-list"></i>
                                <span className={isOpen ? "visible" : "hidden"}> Event Logs</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </>

            
        
    );
};

export default Sidebar;
