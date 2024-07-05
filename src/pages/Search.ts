import './Search.css';
import { fetchSearchResults } from '../services/searchService';
import { playTrack } from '../services/player';
import { renderPlaylistDetails } from '../pages/Home';
import { renderAlbumDetails } from '../pages/Albums'; 

let lastSearchQuery: string | null = null; // Variable para almacenar la última consulta de búsqueda

export async function renderSearchResults(query: string): Promise<string> {
  lastSearchQuery = query; // Guardar la consulta de búsqueda
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return `<p>Inicie sesión para buscar contenido.</p>`;
  }

  const searchResults: SearchResults = await fetchSearchResults(query, token);

  let html = `<h2>Resultados de búsqueda para "${query}"</h2>`;

  // Renderizar resultados de Tracks
  if (searchResults.tracks && searchResults.tracks.items.length > 0) {
    html += '<section><h3>Tracks</h3><ul class="search-list">';
    searchResults.tracks.items.forEach(track => {
      html += `
        <li class="search-item" data-uri="${track.uri}">
          <img src="${track.album.images[0]?.url || 'src/img/default_track.png'}" alt="${track.name}" class="search-img">
          <div class="search-info">
            <p class="search-name">${track.name}</p>
            <p class="search-artist">${track.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </li>`;
    });
    html += '</ul></section>';
  }

  // Renderizar resultados de Albums
  if (searchResults.albums && searchResults.albums.items.length > 0) {
    html += '<section><h3>Albums</h3><ul class="search-list">';
    searchResults.albums.items.forEach(album => {
      html += `
        <li class="search-item album-item" data-id="${album.id}">
          <img src="${album.images[0]?.url || 'src/img/default_album.png'}" alt="${album.name}" class="search-img">
          <div class="search-info">
            <p class="search-name">${album.name}</p>
            <p class="search-artist">${album.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </li>`;
    });
    html += '</ul></section>';
  }

  // Renderizar resultados de Playlists
  if (searchResults.playlists && searchResults.playlists.items.length > 0) {
    html += '<section><h3>Playlists</h3><ul class="search-list">';
    searchResults.playlists.items.forEach(playlist => {
      html += `
        <li class="search-item playlist-item" data-id="${playlist.id}">
          <img src="${playlist.images[0]?.url || 'src/img/default_playlist.png'}" alt="${playlist.name}" class="search-img">
          <div class="search-info">
            <p class="search-name">${playlist.name}</p>
            <p class="search-artist">${playlist.owner.display_name}</p>
          </div>
        </li>`;
    });
    html += '</ul></section>';
  }

  return html;
}

export function addSearchResultClickHandlers() {
  document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', function (this: HTMLElement) {
      const trackUri = this.getAttribute('data-uri');
      if (trackUri) {
        playTrack(trackUri);
      } else {
        console.error('No se pudo obtener el URI de la canción');
      }
    });
  });

  document.querySelectorAll('.album-item').forEach(item => {
    item.addEventListener('click', async function (this: HTMLElement) {
      const albumId = this.getAttribute('data-id');
      if (albumId) {
        const mainContent = document.getElementById('mainContent')!;
        mainContent.innerHTML = await renderAlbumDetails(albumId);
        addBackToSearchHandler();
        addTrackClickHandlers();
      } else {
        console.error('No se pudo obtener el ID del álbum');
      }
    });
  });

  document.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', async function (this: HTMLElement) {
      const playlistId = this.getAttribute('data-id');
      if (playlistId) {
        const mainContent = document.getElementById('mainContent')!;
        mainContent.innerHTML = await renderPlaylistDetails(playlistId);
        addBackToSearchHandler();
        addTrackClickHandlers();
      } else {
        console.error('No se pudo obtener el ID de la playlist');
      }
    });
  });
}

export function addBackToSearchHandler() {
  const backButton = document.createElement('button');
  backButton.innerText = 'Volver a resultados de búsqueda';
  backButton.addEventListener('click', async () => {
    if (lastSearchQuery) {
      const mainContent = document.getElementById('mainContent')!;
      mainContent.innerHTML = await renderSearchResults(lastSearchQuery);
      addSearchResultClickHandlers();
    }
  });
  const mainContent = document.getElementById('mainContent')!;
  mainContent.prepend(backButton);
}

function addTrackClickHandlers() {
  document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', function (this: HTMLElement) {
      const trackUri = this.getAttribute('data-uri');
      if (trackUri) {
        playTrack(trackUri);
      } else {
        console.error('No se pudo obtener el URI de la canción');
      }
    });
  });
}