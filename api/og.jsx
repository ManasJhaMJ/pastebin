import { ImageResponse } from '@vercel/og';

// Dynamic Open Graph preview image for a paste.
// Rendered at /api/og?title=<slug>&lang=<language>
export const config = { runtime: 'edge' };

const LANG_LABELS = {
    plaintext: 'Plain Text',
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    css: 'CSS',
    html: 'HTML',
    cpp: 'C++',
    c: 'C',
};

export default function handler(req) {
    const { searchParams } = new URL(req.url);
    const rawTitle = (searchParams.get('title') || 'BinPaste').slice(0, 48);
    const langKey = (searchParams.get('lang') || '').toLowerCase();
    const lang = LANG_LABELS[langKey] || (langKey ? langKey : 'Text');

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#1e1e1e',
                    padding: '70px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div
                        style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '12px',
                            backgroundColor: '#14b938',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '32px',
                            fontWeight: 700,
                        }}
                    >
                        B
                    </div>
                    <div style={{ color: '#fff', fontSize: '38px', fontWeight: 700 }}>BinPaste</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            backgroundColor: '#14b938',
                            color: '#04210c',
                            fontSize: '26px',
                            fontWeight: 700,
                            padding: '6px 18px',
                            borderRadius: '999px',
                            marginBottom: '24px',
                        }}
                    >
                        {lang}
                    </div>
                    <div
                        style={{
                            color: '#fff',
                            fontSize: '68px',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            wordBreak: 'break-word',
                        }}
                    >
                        {rawTitle}
                    </div>
                </div>

                <div style={{ color: '#9a9a9a', fontSize: '30px', display: 'flex' }}>
                    The better pastebin alternative · www.binpaste.xyz
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
