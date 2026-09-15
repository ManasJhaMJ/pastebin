// src/pages/Terms.js
// Terms of Service / Acceptable Use for BinPaste.
import { Link } from 'react-router-dom';

function Terms() {
    return (
        <article className="content-section">
            <h1>Terms of Service</h1>
            <p className="page-meta">Last updated: 15 September 2026</p>
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

            <h2>6. User-generated content and disclaimer</h2>
            <p>
                BinPaste hosts user-generated content. Pastes are created and shared by users, and
                they are not reviewed, verified, moderated, or endorsed before they become
                accessible. A paste may also contain links to external websites over which we have no
                control. The presence of any paste on this site does not imply that we agree with it,
                have checked it, or vouch for its accuracy, legality, or safety.
            </p>
            <p>
                The developer of this website is not responsible for any content posted, shared, or
                linked by users, or for any misuse, loss, or damage arising from the use of this
                service. Content is provided &quot;as is&quot; without warranty of any kind.
            </p>
            <p>
                To the fullest extent permitted by law, the developer shall not be liable for any
                direct, indirect, incidental, special, or consequential damages arising from your use
                of, or inability to use, BinPaste - including any damages resulting from content
                posted by other users, from the loss or deletion of a paste, or from a paste being
                accessed by someone you did not intend to share it with.
            </p>
            <p>
                If you find a paste that breaches these terms, report it using the Report button on
                that paste or email us the link (see section 4). See also our{' '}
                <Link to="/privacy">Privacy Policy</Link> for what is stored and how to request
                deletion.
            </p>

            <h2>7. Changes to these terms</h2>
            <p>
                These terms may be updated from time to time. Continued use of BinPaste after changes
                are posted constitutes acceptance of the updated terms.
            </p>

            <p className="content-links">
                <Link to="/">Back to BinPaste</Link> · <Link to="/privacy">Privacy Policy</Link> ·{' '}
                <Link to="/about">About</Link> · <Link to="/contact">Contact</Link> ·{' '}
                <Link to="/guides">Guides</Link>
            </p>
        </article>
    );
}

export default Terms;
