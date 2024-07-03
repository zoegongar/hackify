import { renderHome } from "./pages/Home";
import { renderPlaylists } from "./pages/Playlists";
import { renderFavorites } from "./pages/Favorites";
import { renderProfile } from "./pages/Profile";

export function navigate(view: string): void {
    const mainContent = document.getElementById('mainContent')!;
    switch (view) {
        case 'home':
            mainContent.innerHTML = renderHome();
            break;
        case 'playlists':
            mainContent.innerHTML = renderPlaylists();
            break;
        case 'favorites':
            mainContent.innerHTML = renderFavorites();
            break;
        case 'profile':
            mainContent.innerHTML = renderProfile();
            break;
        default:
            mainContent.innerHTML = '<h1>404</h1><p>Page not found.</p>';
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
