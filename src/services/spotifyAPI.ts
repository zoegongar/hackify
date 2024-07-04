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
export const getUserPlaylists = async () => {
  const response = await fetch(`${BASE_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener detalles de una playlist específica
export const getPlaylistDetails = async (playlistId: string) => {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener tracks guardados del usuario (favoritos)
export const getSavedTracks = async () => {
  const response = await fetch(`${BASE_URL}/me/tracks`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener tracks de una playlist específica
export const getPlaylistTracks = async (playlistId: string) => {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener detalles de un track específico
export const getTrackDetails = async (trackId: string) => {
  const response = await fetch(`${BASE_URL}/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para buscar tracks por nombre
export const searchTracks = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search?q=${query}&type=track`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener información del perfil del usuario
export const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para controlar la reproducción del player (reproducir, pausar, etc.)
export const controlPlayer = async (action: string) => {
  const response = await fetch(`${BASE_URL}/me/player/${action}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener información de un artista específico
export const getArtistDetails = async (artistId: string) => {
  const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

//Función para obtener detalles de un álbum específico
export const getAlbumDetails = async (albumId: string) => {
  const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
  });
  return response.json();
};

