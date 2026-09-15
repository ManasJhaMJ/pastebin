// src/pages/Privacy.js
// Privacy Policy. Describes exactly what the app collects: Firebase Realtime
// Database (paste content), Firebase/Google Analytics (page + paste events and
// a random localStorage visitor id), Google AdSense cookies, and Vercel server
// logs. Keep this in sync with src/firebase.js, RouteTracker.jsx and index.html.
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'work4manasjha@gmail.com';

function Privacy() {
    return (
        <article className="content-section">
            <h1>Privacy Policy</h1>
            <p className="page-meta">Last updated: 15 September 2026</p>
            <p className="lead">
                This policy explains what data BinPaste collects, why, and what your choices are. It
                covers www.binpaste.xyz only. BinPaste has no accounts and no login, so there is very
                little personal data involved - but the parts that do exist are described in full
                below.
            </p>

            <h2>1. Who runs this site</h2>
            <p>
                BinPaste is an independent project built and operated by Manas Jha, an individual
                developer, not a company. For any privacy question or request, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See the{' '}
                <Link to="/about">About page</Link> for more on the project.
            </p>

            <h2>2. Content you paste</h2>
            <p>
                When you create a paste, the following is stored in a Google Firebase Realtime
                Database: the text you entered, the language you selected, the name (URL slug) you
                chose, the time of creation, the expiry time if you set one, whether you marked the
                paste public, and a count of how many times it has been viewed.
            </p>
            <p>
                No account is required and no name, email address, or identity is attached to a
                paste. If you type personal information into the text of a paste, that information is
                stored as part of the paste content - so please do not paste passwords, API keys,
                financial details, or other sensitive personal data. Anyone who has the link to a
                paste can read it.
            </p>
            <p>
                Pastes marked public appear on the <Link to="/public">Public Pastes</Link> feed.
                Pastes not marked public are unlisted: they are reachable by anyone with the link,
                but are not listed on the site and are served with a{' '}
                <code>noindex</code> instruction so search engines do not add them to their results.
            </p>

            <h2>3. How long pastes are kept</h2>
            <p>
                If you set an expiry when creating a paste (10 minutes to 1 month), the paste stops
                being accessible after that time and is deleted. If you choose &quot;Never&quot;, the
                paste is kept until it is deleted on request or the service is discontinued. Pastes
                may also be removed at any time at our discretion, for example in response to an
                abuse report. Do not rely on BinPaste as your only copy of anything.
            </p>
            <p>
                To have a paste deleted, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the paste link, or use
                the Report button on the paste page.
            </p>

            <h2>4. Analytics</h2>
            <p>
                BinPaste uses Google Analytics for Firebase to understand how the site is used - for
                example how many pages are viewed and whether pastes are being found or have expired.
                The events recorded are page views, paste views (including the paste name and its
                language), and errors such as a paste not being found.
            </p>
            <p>
                To distinguish one visitor from another without an account, a random identifier is
                generated in your browser and saved in your browser&apos;s local storage under the key{' '}
                <code>binpaste_uid</code>. It is a random string, it is not linked to your name or
                email, and it never leaves your browser except as an anonymous analytics identifier.
                Clearing your browser&apos;s site data removes it. Google Analytics may also collect
                standard technical information such as your approximate location (derived from IP
                address), device type, browser, and referring page.
            </p>

            <h2>5. Advertising and cookies</h2>
            <p>
                BinPaste displays advertising served by Google AdSense in order to cover hosting
                costs and keep the service free.
            </p>
            <ul>
                <li>
                    Third-party vendors, including Google, use cookies to serve ads based on your
                    prior visits to this and other websites.
                </li>
                <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads
                    to you based on your visit to this site and/or other sites on the internet.
                </li>
                <li>
                    You can opt out of personalised advertising by visiting{' '}
                    <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Ads Settings
                    </a>
                    . You can also opt out of third-party vendors&apos; use of cookies for
                    personalised advertising at{' '}
                    <a
                        href="https://www.aboutads.info/choices/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        aboutads.info
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://optout.networkadvertising.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        optout.networkadvertising.org
                    </a>
                    .
                </li>
                <li>
                    You can block or delete cookies through your browser settings at any time. Doing
                    so does not stop you using BinPaste.
                </li>
            </ul>
            <p>
                For details of how Google handles data from sites that use its services, see{' '}
                <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    How Google uses information from sites or apps that use our services
                </a>
                .
            </p>

            <h2>6. Hosting and server logs</h2>
            <p>
                The site is hosted on Vercel and its data is stored on Google Firebase. As with
                virtually all web hosting, requests to the site are logged by the host, which may
                include your IP address, the page requested, the time of the request, and your
                browser&apos;s user agent. These logs are used for operational purposes such as
                diagnosing errors and mitigating abuse. See the{' '}
                <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vercel privacy policy
                </a>{' '}
                and the{' '}
                <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Firebase privacy documentation
                </a>
                .
            </p>

            <h2>7. What we do not do</h2>
            <ul>
                <li>We do not ask you to create an account, and we do not collect passwords.</li>
                <li>
                    We do not collect your email address unless you choose to email us, in which case
                    it is used only to reply to you.
                </li>
                <li>We do not sell your personal information.</li>
                <li>We do not use your paste content for advertising or profiling.</li>
            </ul>

            <h2>8. Your rights</h2>
            <p>
                Depending on where you live, you may have rights over your personal data under laws
                such as the GDPR (EU/UK) or the CCPA (California) - including the right to access,
                correct, or delete it, and to object to certain processing.
            </p>
            <p>
                Because BinPaste has no accounts, we generally cannot identify which pastes belong to
                which person. In practice this means: to have specific content deleted, email us the
                paste link and we will remove it. To remove the analytics identifier stored in your
                browser, clear your site data. To stop personalised advertising, use the opt-out links
                in section 5. For anything else, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will respond as far as
                we are able.
            </p>

            <h2>9. Children</h2>
            <p>
                BinPaste is not directed at children and is not intended for use by anyone under the
                age of 13. We do not knowingly collect personal information from children. If you
                believe a child has submitted personal information through a paste, email us and we
                will delete it.
            </p>

            <h2>10. Content posted by other users</h2>
            <p>
                BinPaste hosts user-generated content. Pastes are created and shared by users, and are
                not reviewed, verified, or moderated before they become accessible. A paste may also
                contain links to other websites, whose privacy practices we neither control nor
                endorse.
            </p>
            <p>
                The developer of this website is not responsible for any content posted, shared, or
                linked by users, or for any misuse, loss, or damage arising from the use of this
                service. Content is provided &quot;as is&quot; without warranty of any kind. This is
                set out in full in section 6 of our <Link to="/terms">Terms of Service</Link>.
            </p>
            <p>
                If you find a paste that exposes personal information about you - your own or someone
                else&apos;s - report it using the Report button on that paste, or email us the link at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Reports of exposed personal
                data and credentials are prioritised, reviewed, and removed.
            </p>

            <h2>11. Changes to this policy</h2>
            <p>
                This policy may be updated as the site changes. The date at the top reflects the most
                recent revision. Significant changes will be noted in the dev updates on the
                homepage.
            </p>

            <h2>12. Contact</h2>
            <p>
                Questions, deletion requests, or privacy concerns:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See the{' '}
                <Link to="/contact">Contact page</Link> for what to include so we can act quickly.
            </p>

            <p className="content-links">
                <Link to="/">Back to BinPaste</Link> · <Link to="/terms">Terms</Link> ·{' '}
                <Link to="/about">About</Link> · <Link to="/contact">Contact</Link>
            </p>
        </article>
    );
}

export default Privacy;
