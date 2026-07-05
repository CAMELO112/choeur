import './globals.css'

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
  <nav>
    <a href="/upload">Uploader</a>
  <a href="/login">Connexion</a>
  <a href="/signup">Inscription</a>
    </nav>
    </header>
  <main>{children}</main>
    </body>
    </html>
  )
}
