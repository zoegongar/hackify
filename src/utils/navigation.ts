import { renderHome } from "../pages/Home";
import { renderPlaylists } from "../pages/Playlists";
import { renderFavorites } from "../pages/Favorites";
import { renderProfile } from "../pages/Profile";
import { playPlaylist } from '../services/player';

export async function navigate(view: string): Promise<void> {
    const mainContent = document.getElementById('mainContent')!;
    switch (view) {
        case 'home':
            mainContent.innerHTML = renderHome();
            break;
        case 'playlists':
            mainContent.innerHTML = await renderPlaylists();
            addPlaylistClickHandlers();
            break;
        case 'favorites':
            mainContent.innerHTML = renderFavorites();
            break;
        case 'profile':
            mainContent.innerHTML = renderProfile();
            break;
        default:
            mainContent.innerHTML = '<h1>404</h1><p>Página no encontrada.</p>';
    }
}

export function setupNavigation(): void {
    const homeLink = document.getElementById('homeLink')!;
    const playlistsLink = document.getElementById('playlistsLink')!;
    const favoritesLink = document.getElementById('favoritesLink')!;

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('home');
    });
    playlistsLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('playlists');
    });
    favoritesLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('favorites');
    });
}

function addPlaylistClickHandlers() {
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function (this: HTMLElement) {
            const uri = this.getAttribute('data-uri');
            if (uri) {
                playPlaylist(uri);
            } else {
                console.error('No se pudo obtener el URI de la playlist');
            }
        });
    });
}
