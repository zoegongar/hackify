import { getCategories, getPlaylists } from './spotifyAPI';

let playlistsCache: Playlist[] = [];

export function setPlaylistsCache(playlists: Playlist[]): void {
  playlistsCache = playlists;
}

export function getPlaylistsCache(): Playlist[] {
  return playlistsCache;
}

export const getRandomPlaylists = async (token: string): Promise<Playlist[]> => {
  try {
    const categories = await getCategories(token);
    const category = categories.categories.items[Math.floor(Math.random() * categories.categories.items.length)];
    const playlistsResponse = await getPlaylists(category.id, token);
    const playlists = playlistsResponse.playlists.items;

    console.log('Playlists fetched from API:', playlists);

    // Filtrar playlists válidas que tengan imágenes
    const validPlaylists = playlists.filter(playlist => playlist.images && playlist.images.length > 0);

    // Seleccionar 10 playlists aleatorias
    const randomPlaylists = [];
    for (let i = 0; i < 10 && validPlaylists.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * validPlaylists.length);
      randomPlaylists.push(validPlaylists[randomIndex]);
      validPlaylists.splice(randomIndex, 1);
    }

    return randomPlaylists;
  } catch (error) {
    console.error('Error fetching random playlists', error);
    return [];
  }
};
