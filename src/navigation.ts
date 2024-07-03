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
    document.getElementById('homeLink')!.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('home');
    });
    document.getElementById('playlistsLink')!.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('playlists');
    });
    document.getElementById('favoritesLink')!.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('favorites');
    });
    document.getElementById('profileLink')!.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('profile');
    });

    // Navegar a la vista inicial (home)
    navigate('home');
}
