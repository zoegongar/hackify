import { renderHome, addHomePlaylistClickHandlers, addHomeRefreshButtonHandler, renderPlaylistDetails, addBackToPlaylistsHandler, addTrackClickHandlers } from "../pages/Home";
import { renderUserPlaylists, renderUserPlaylistDetails, addUserPlaylistClickHandlers, addUserRefreshButtonHandler, addBackToUserPlaylistsHandler } from "../pages/Playlists";
import { renderFavorites } from "../pages/Favorites";
import { renderProfile } from "../pages/Profile";

export async function navigate(view: string, id?: string): Promise<void> {
  const mainContent = document.getElementById('mainContent')!;
  switch (view) {
    case 'home':
      mainContent.innerHTML = await renderHome();
      addHomePlaylistClickHandlers();
      addHomeRefreshButtonHandler();
      break;
      case 'playlists':
        mainContent.innerHTML = await renderUserPlaylists();
        addUserPlaylistClickHandlers();
        addUserRefreshButtonHandler();
        break;
    case 'playlist':
      if (id) {
        mainContent.innerHTML = await renderPlaylistDetails(id);
        addBackToPlaylistsHandler();
        addTrackClickHandlers();
      }
      break;
      case 'user-playlist':
        if (id) {
          mainContent.innerHTML = await renderUserPlaylistDetails(id);
          addBackToUserPlaylistsHandler();
          addTrackClickHandlers();
        }
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
