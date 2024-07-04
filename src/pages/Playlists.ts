// pages/Playlists.ts
import { getRandomPlaylists, getPlaylistsCache } from '../services/playlistsService';
import { getPlaylistDetails } from '../services/spotifyAPI';
import { playTrack } from '../services/player';

export async function renderPlaylists(): Promise<string> {
    const playlists: Playlist[] = getPlaylistsCache();
    if (playlists.length === 0) {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            return `<p>Inicie sesión para ver las listas de reproducción.</p>`;
        }
        const newPlaylists = await getRandomPlaylists(token);
        return renderPlaylistsHTML(newPlaylists);
    }
    return renderPlaylistsHTML(playlists);
}

function renderPlaylistsHTML(playlists: Playlist[]): string {
    return `
        <h2>Playlists <button id="refreshButton">Actualizar</button></h2>
        <ul id="playlists">
            ${playlists.map(playlist => `
                <li data-id="${playlist.id}" class="playlist-item">
                    ${playlist.images && playlist.images.length > 0 ? `<img src="${playlist.images[0].url}" alt="${playlist.name}" />` : ''}
                    <p>${playlist.name}</p>
                </li>
            `).join('')}
        </ul>
    `;
}

// Renderizar detalles de una playlist específica
export async function renderPlaylistDetails(playlistId: string): Promise<string> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return `<p>Inicie sesión para ver los detalles de la lista de reproducción.</p>`;
  }

  const playlist = await getPlaylistDetails(playlistId, token);
  console.log('Playlist details:', playlist);

  const firstTrackUri = playlist.tracks.items[0]?.track.uri || null;
  if (firstTrackUri) {
    playTrack(firstTrackUri);
  }

  return `
    <div>
      <h2><span class="back-to-playlists" style="cursor:pointer;color:blue;">Playlist</span> / ${playlist.name}</h2>
      <ul>
        ${playlist.tracks.items.map(item => `
          <li data-uri="${item.track.uri}" class="track-item">
            ${item.track.name}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

export function addTrackClickHandlers() {
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
