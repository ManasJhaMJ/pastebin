// src/pages/Terms.js
// Terms of Service / Acceptable Use for BinPaste.
import { Link } from 'react-router-dom';

function Terms() {
    return (
        <article className="content-section">
            <h1>Terms of Service</h1>
            <p className="lead">
                Please read these terms carefully before using BinPaste. By creating, viewing, or
                sharing a paste, you agree to these terms.
            </p>

            <h2>1. The service</h2>
            <p>
                BinPaste is a free tool for sharing code snippets and text online. Pastes are created
                and shared by users. No account is required. The service is provided free of charge
                and may be changed, limited, or discontinued at any time without notice.
            </p>

            <h2>2. Acceptable use</h2>
            <p>You agree that you will not use BinPaste to create, store, or share content that:</p>
            <ul>
                <li>is illegal, or promotes or facilitates illegal activity;</li>
                <li>infringes the intellectual property, privacy, or other rights of any person;</li>
                <li>
                    contains malware, credentials, personal data, or other sensitive information you
                    are not authorized to share;
                </li>
                <li>is defamatory, harassing, hateful, or threatening;</li>
                <li>is spam, phishing, or intended to deceive; or</li>
                <li>attempts to disrupt, overload, or gain unauthorized access to the service.</li>
            </ul>

            <h2>3. Your content</h2>
            <p>
                You are solely responsible for the content you post. You retain ownership of your
                content, and by posting it you confirm you have the right to share it. A paste cannot
                be edited after creation. Pastes may expire and be deleted automatically based on the
                expiry you choose, and may also be removed at our discretion.
            </p>

            <h2>4. Content removal</h2>
            <p>
                To report abuse or request removal of a paste, use the Report button on any paste or
                email <a href="mailto:work4manasjha@gmail.com">work4manasjha@gmail.com</a> with the
                paste link. We review requests and may remove content without notice.
            </p>

            <h2>5. No warranty</h2>
            <p>
                The service is provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, whether express or implied, including reliability,
                availability, or fitness for a particular purpose. We do not guarantee that pastes
                will be stored, retained, or remain accessible for any period of time. Do not rely on
                BinPaste as your only copy of any content.
            </p>

            <h2>6. Limitation of liability</h2>
            <p>
                Pastes are created and shared by users. The developer of this website is not
                responsible for any content posted, shared, or linked by users, or for any misuse,
                loss, or damage arising from the use of this service. To the fullest extent permitted
                by law, the developer shall not be liable for any direct, indirect, incidental, or
                consequential damages arising from your use of, or inability to use, BinPaste.
            </p>

            <h2>7. Changes to these terms</h2>
            <p>
                These terms may be updated from time to time. Continued use of BinPaste after changes
                are posted constitutes acceptance of the updated terms.
            </p>

            <p className="content-links">
                <Link to="/">Back to BinPaste</Link> · <Link to="/guides">Guides</Link>
            </p>
        </article>
    );
}

export default Terms;
