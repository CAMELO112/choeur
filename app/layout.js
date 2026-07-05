import './globals.css'
import NavBar from './components/NavBar'

export const metadata = {
  title: 'Choeur',
  description: 'Plateforme de streaming musical et communautaire',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
    <body>
    <header className="topbar">
    <a href="/" className="logo">Choeur</a>
  <NavBar />
    </header>
  <main>{children}</main>
    </body>
    </html>
  )
}
