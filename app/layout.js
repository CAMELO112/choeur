import './globals.css'
import NavBar from './components/NavBar'
import { PlayerProvider } from './components/PlayerContext'
import PlayerBar from './components/PlayerBar'

export const metadata = {
    title: 'Choeur',
    description: 'Plateforme de streaming musical et communautaire',
}

export default function RootLayout({ children }) {
    return (
          <html lang="fr">
            <body>
              <PlayerProvider>
                <header className="topbar">
                  <a href="/" className="logo">Choeur</a>
              <NavBar />
      </header>
            <main>{children}</main>
            <PlayerBar />
      </PlayerProvider>
      </body>
      </html>
    )
}
