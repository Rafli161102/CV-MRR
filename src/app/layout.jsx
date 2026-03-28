export const metadata = { title: 'My App', description: 'This is my Next.js 13+ app' };

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}