import './globals.css'

export const metadata = {
  title: 'Rafli Ramadhan | Graphic Designer',
  description: 'Portofolio Profesional Muhammad Rafli Ramadhan',
  verification: {
    google: 'VWmcOgVzf5UkbpNQtM0LDiK9lh-6HWLCIxFqodaaec0',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
