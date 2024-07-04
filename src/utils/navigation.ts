import { renderHome, addHomePlaylistClickHandlers, addHomeRefreshButtonHandler, renderPlaylistDetails, addBackToPlaylistsHandler, addTrackClickHandlers } from "../pages/Home";
import { renderUserPlaylists, renderUserPlaylistDetails, addUserPlaylistClickHandlers, addUserRefreshButtonHandler, addBackToUserPlaylistsHandler } from "../pages/Playlists";
import { renderFavorites } from "../pages/Favorites";
import { renderProfile } from "../pages/Profile";
import { renderSearchResults, addSearchResultClickHandlers, addBackToSearchHandler } from "../pages/Search";
import { renderAlbumDetails, addAlbumTrackClickHandlers } from "../pages/Albums";

export async function navigate(view: string, id?: string, query?: string): Promise<void> {
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
      mainContent.innerHTML = await renderFavorites();
      break;
    case 'profile':
      mainContent.innerHTML = renderProfile();
      break;
    case 'search': 
      if (query) {
        mainContent.innerHTML = await renderSearchResults(query);
        addSearchResultClickHandlers();
      }
      break;
    case 'album':
      if (id) {
        mainContent.innerHTML = await renderAlbumDetails(id);
        addBackToSearchHandler();
        addAlbumTrackClickHandlers();
      }
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
