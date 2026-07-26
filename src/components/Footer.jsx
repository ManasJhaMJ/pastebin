import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <nav className="footer-links">
                <Link to="/">New Paste</Link>
                <Link to="/public">Public Pastes</Link>
                <Link to="/pastebin-alternative">Pastebin Alternative</Link>
                <Link to="/guides">Guides</Link>
                <Link to="/terms">Terms</Link>
            </nav>
            <p className="removal-note">
                To report or request removal of content, email{' '}
                <a href="mailto:work4manasjha@gmail.com">work4manasjha@gmail.com</a>.
            </p>
            <p className="disclaimer-note">
                Disclaimer: Pastes are created and shared by users. The developer of this website is
                not responsible for any content posted, shared, or linked by users, or for any
                misuse, loss, or damage arising from the use of this service. Content is provided
                &quot;as is&quot; without warranty of any kind.
            </p>
            <p>
                All Rights Reserved. &copy; 2024-2026 BinPaste.
            </p>
            <p>
                Made with ❤️ by <a href="https://github.com/manasjhamj">MJ</a>
            </p>
        </footer>
    )
}

export default Footer
