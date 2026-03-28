import './globals.css'

export const metadata = {
  title: 'Rafli Ramadhan | Graphic Designer',
  description: 'Portofolio Profesional Muhammad Rafli Ramadhan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
