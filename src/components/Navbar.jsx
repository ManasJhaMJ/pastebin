import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";


function Navbar() {
    return (
        <nav>
            <NavLink to="/" className="brand">
                <img src="/logo.png" alt="BinPaste logo" className="brand-logo" />
                <span className="brand-text">
                    <span className="brand-name">BinPaste</span>
                    <span className="brand-tagline">The better pastebin alternative - share code &amp; text instantly.</span>
                </span>
            </NavLink>

            <span className="ul">
                <NavLink to="/"><button className="btn01">
                    <FaPlus size={13} />
                    New Paste
                </button></NavLink>
                <NavLink to="find"><button className="btn02">
                    <FaSearch size={13} />
                    Find Paste
                </button></NavLink>
                <NavLink to="public"><button className="btn01">
                    <FaGlobeAsia size={13} />
                    Public
                </button></NavLink>
            </span>
        </nav>
    )
}

export default Navbar