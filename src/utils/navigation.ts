// utils/navigation.ts
import { renderHome } from "../pages/Home";
import { renderPlaylists, renderPlaylistDetails, addTrackClickHandlers } from "../pages/Playlists";
import { renderFavorites } from "../pages/Favorites";
import { renderProfile } from "../pages/Profile";
import { getPlaylistsCache, setPlaylistsCache, getRandomPlaylists } from '../services/playlistsService';

export async function navigate(view: string, id?: string): Promise<void> {
  const mainContent = document.getElementById('mainContent')!;
  switch (view) {
    case 'home':
      mainContent.innerHTML = renderHome();
      break;
    case 'playlists':
      const cachedPlaylists = getPlaylistsCache();
      if (cachedPlaylists.length === 0) {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const playlists = await getRandomPlaylists(token);
          setPlaylistsCache(playlists);
        }
      }
      mainContent.innerHTML = await renderPlaylists();
      addPlaylistClickHandlers();
      addRefreshButtonHandler();
      break;
    case 'playlist':
      if (id) {
        mainContent.innerHTML = await renderPlaylistDetails(id);
        addBackToPlaylistsHandler();
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

function addPlaylistClickHandlers() {
  document.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', function (this: HTMLElement) {
      const playlistId = this.getAttribute('data-id');
      if (playlistId) {
        navigate('playlist', playlistId);
      } else {
        console.error('No se pudo obtener el ID de la playlist');
      }
    });
  });
}

function addBackToPlaylistsHandler() {
  document.querySelector('.back-to-playlists')?.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('playlists');
  });
}

function addRefreshButtonHandler() {
  const refreshButton = document.getElementById('refreshButton');
  if (refreshButton) {
    refreshButton.addEventListener('click', async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const playlists = await getRandomPlaylists(token);
        setPlaylistsCache(playlists);
        navigate('playlists');
      }
    });
  }
}
