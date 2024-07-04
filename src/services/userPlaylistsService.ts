import { getUserPlaylists } from './spotifyAPI';

let userPlaylistsCache: Playlist[] = [];

export function setUserPlaylistsCache(playlists: Playlist[]): void {
    userPlaylistsCache = playlists;
}

export function getUserPlaylistsCache(): Playlist[] {
    return userPlaylistsCache;
}

export const fetchUserPlaylists = async (token: string): Promise<Playlist[]> => {
    try {
        const playlistsResponse: UserPlaylistsResponse = await getUserPlaylists(token);
        const playlists: Playlist[] = playlistsResponse.items;

        console.log('User playlists fetched from API:', playlists);

        // Filtrar playlists válidas que tengan imágenes
        const validPlaylists = playlists.filter((playlist: Playlist) => playlist.images && playlist.images.length > 0);

        return validPlaylists;
    } catch (error) {
        console.error('Error fetching user playlists', error);
        return [];
    }
};
