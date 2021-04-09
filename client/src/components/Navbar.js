import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to="/" className="brand-logo left">
					PlayStore
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
