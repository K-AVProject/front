import './styles/globals.css';

export const metadata = {
    title: 'Music Player',
    description: 'A simple music player app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
