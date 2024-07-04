import { getRandomPlaylists } from '../services/playlistsService';

export async function renderPlaylists(): Promise<string> {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return `<p>Inicie sesión para ver las listas de reproducción.</p>`;
    }

    const playlists: Playlist[] = await getRandomPlaylists(token);
    console.log('Random playlists:', playlists);
    return `
        <h2>Playlists</h2>
        <ul id="playlists">
            ${playlists.map(playlist => `
                <li data-uri="${playlist.uri}" class="playlist-item">
                    ${playlist.images && playlist.images.length > 0 ? `<img src="${playlist.images[0].url}" alt="${playlist.name}" />` : ''}
                    <p>${playlist.name}</p>
                </li>
            `).join('')}
        </ul>
    `;
}
