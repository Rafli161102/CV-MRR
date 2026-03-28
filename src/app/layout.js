import "./globals.css";

export const metadata = {
  title: "Rafli Ramadhan | Graphic Designer",
  description: "Portofolio profesional Muhammad Rafli Ramadhan. Berpengalaman dalam desain cetak, digital, dan identitas merek.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}