import { SiPastebin } from "react-icons/si";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";


function Navbar() {
    return (
        <nav>
            <span>
                <SiPastebin size={30} />
                <h1>BinPaste</h1>
            </span>

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