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
    html += '<section><h3>Tracks</h3><ul>';
    searchResults.tracks.items.forEach(track => {
      html += `<li data-uri="${track.uri}" class="track-item">${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</li>`;
    });
    html += '</ul></section>';
  }

  // Renderizar resultados de Albums
  if (searchResults.albums && searchResults.albums.items.length > 0) {
    html += '<section><h3>Albums</h3><ul>';
    searchResults.albums.items.forEach(album => {
      html += `<li data-id="${album.id}" class="album-item">${album.name} by ${album.artists.map(artist => artist.name).join(', ')}</li>`;
    });
    html += '</ul></section>';
  }

  // Renderizar resultados de Playlists
  if (searchResults.playlists && searchResults.playlists.items.length > 0) {
    html += '<section><h3>Playlists</h3><ul>';
    searchResults.playlists.items.forEach(playlist => {
      html += `<li data-id="${playlist.id}" class="playlist-item">${playlist.name} by ${playlist.owner.display_name}</li>`;
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

  document.querySelectorAll('.album-item').forEach(item => { // Añadir manejador de clic para álbumes
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
