const BASE_URL = 'https://api.spotify.com/v1';

//Función para obtener categorías de música
export const getCategories = async (token: string): Promise<CategoryResponse> => {
  const response = await fetch(`${BASE_URL}/browse/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Función para obtener playlists de una categoría específica
export const getPlaylists = async (categoryId: string, token: string): Promise<PlaylistResponse> => {
  const response = await fetch(`${BASE_URL}/browse/categories/${categoryId}/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('Playlists response:', data);
  return data;
};


//Función para obtener playlists del usuario
export const getUserPlaylists = async (token: string): Promise<UserPlaylist> => {
  const response = await fetch(`${BASE_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para obtener detalles de una playlist específica
export const getPlaylistDetails = async (playlistId: string, token: string): Promise<PlaylistDetails> => {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Función para obtener tracks guardados del usuario (favoritos)
export const getSavedTracks = async (token: string): Promise<SavedTracks> => {
  const response = await fetch(`${BASE_URL}/me/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching saved tracks: ${response.statusText}`);
  }
  return response.json();
};

//Función para obtener tracks de una playlist específica
export const getPlaylistTracks = async (playlistId: string, token: string): Promise<PlaylistTracks> => {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para obtener detalles de un track específico
export const getTrackDetails = async (trackId: string, token: string): Promise<TrackDetails> => {
  const response = await fetch(`${BASE_URL}/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para buscar tracks por nombre
export const searchTracks = async (query: string, token: string): Promise<SearchTracks> => {
  const response = await fetch(`${BASE_URL}/search?q=${query}&type=track`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para buscar canciones, álbums, listas de reproducción o artistas
export async function search(query: string, token: string, type: string): Promise<SearchResults> {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching search results: ${response.statusText}`);
  }
  return response.json();
}


//Función para obtener información del perfil del usuario
export const getProfile = async (token: string): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para controlar la reproducción del player (reproducir, pausar, etc.)
export const controlPlayer = async (action: string, token: string): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/me/player/${action}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

//Función para obtener información de un artista específico
export const getArtistDetails = async (artistId: string, token: string): Promise<ArtistDetails> => {
  const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Función para obtener detalles de un álbum específico
export const getAlbumDetails = async (albumId: string, token: string): Promise<AlbumDetails> => {
  const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

  