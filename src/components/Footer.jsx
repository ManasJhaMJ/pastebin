import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <nav className="footer-links">
                <Link to="/">New Paste</Link>
                <Link to="/public">Public Pastes</Link>
                <Link to="/pastebin-alternative">Pastebin Alternative</Link>
                <Link to="/guides">Guides</Link>
            </nav>
            <p className="removal-note">
                To report or request removal of content, email{' '}
                <a href="mailto:work4manasjha@gmail.com">work4manasjha@gmail.com</a>.
            </p>
            <p>
                All Rights Reserved. &copy; 2024
            </p>
            <p>
                Made with ❤️ by <a href="https://github.com/manasjhamj">MJ</a>
            </p>
        </footer>
    )
}

export default Footer
