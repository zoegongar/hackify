import { fetchUserPlaylists, getUserPlaylistsCache, setUserPlaylistsCache } from '../services/userPlaylistsService';
import { playTrack } from '../services/player';
import { getPlaylistDetails } from '../services/spotifyAPI';
import { navigate } from '../utils/navigation';
import './Playlists.css';

export async function renderUserPlaylists(): Promise<string> {
    const playlists: Playlist[] = getUserPlaylistsCache();
    if (playlists.length === 0) {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            return `<p>Inicie sesión para ver las listas de reproducción.</p>`;
        }
        const newPlaylists = await fetchUserPlaylists(token);
        setUserPlaylistsCache(newPlaylists);
        return renderUserPlaylistsHTML(newPlaylists);
    }
    return renderUserPlaylistsHTML(playlists);
}

function renderUserPlaylistsHTML(playlists: Playlist[]): string {
    return `
        <h2 class="mis-playlists">Mis Playlists</h2>
        <ul id="userPlaylists" class="user-playlists">
            ${playlists.map(playlist => `
                <li data-id="${playlist.id}" class="user-playlist-item">
                    ${playlist.images && playlist.images.length > 0 ? `<img src="${playlist.images[0].url}" alt="${playlist.name}" />` : ''}
                    <p>${playlist.name}</p>
                </li>
            `).join('')}
        </ul>
    `;
}

export async function renderUserPlaylistDetails(playlistId: string): Promise<string> {
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
    <div class="playlist-details">
            <div class="playlist-header">
                ${playlist.images && playlist.images.length > 0 ? `<img class="playlist-image" src="${playlist.images[0].url}" alt="${playlist.name}" />` : ''}
                <h2 class="back-to-user-playlists">Mis Playlists / ${playlist.name}</h2>
            </div>
            <ul class="playlist-tracks">
                ${playlist.tracks.items.map(item => `
                    <li data-uri="${item.track.uri}" class="track-item">
                        ${item.track.name}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

export function addUserPlaylistClickHandlers() {
    document.querySelectorAll('.user-playlist-item').forEach(item => {
        item.addEventListener('click', function (this: HTMLElement) {
            const playlistId = this.getAttribute('data-id');
            if (playlistId) {
                navigate('user-playlist', playlistId); // Navegar a la vista de detalles de la playlist del usuario
            } else {
                console.error('No se pudo obtener el ID de la playlist');
            }
        });
    });
}

export function addUserRefreshButtonHandler() {
    const refreshButton = document.getElementById('refreshUserPlaylistsButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const playlists = await fetchUserPlaylists(token);
                setUserPlaylistsCache(playlists);
                document.getElementById('mainContent')!.innerHTML = await renderUserPlaylists();
                addUserPlaylistClickHandlers();
                addUserRefreshButtonHandler();
            }
        });
    }
}

export function addBackToUserPlaylistsHandler() {
    const backToPlaylists = document.querySelector('.back-to-user-playlists');
    if (backToPlaylists) {
        backToPlaylists.addEventListener('click', (event) => {
            event.preventDefault();
            navigate('playlists');
        });
    }
}
