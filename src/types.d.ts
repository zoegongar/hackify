// Tipos relacionados con Imágenes
type Image = {
  url: string;
  height: number;
  width: number;
};

// Tipos relacionados con Usuarios
type UserProfile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type Profile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

// Tipos relacionados con Tokens
type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

// Tipos relacionados con Playlists
type Playlist = {
  id: string;
  name: string;
  images: Image[];
  external_urls: {
    spotify: string;
  };
  description: string;
  collaborative: boolean;
  href: string;
  owner: {
    display_name: string;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
    items: PlaylistTrack[];
  };
  type: string;
  uri: string;
};

type PlaylistTrack = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string;
  track: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
};

type PlaylistResponse = {
  playlists: {
    items: Playlist[];
  };
};

type UserPlaylistsResponse = {
  items: Playlist[];
};

type UserPlaylist = {
  items: Playlist[];
};

type PlaylistDetails = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: PlaylistTrack[];
  };
};

type PlaylistRequest = {
  items: Playlist[];
};

type PlaylistTracks = {
  href: string;
  items: PlaylistTrack[];
};

// Tipos relacionados con Categorías
type Category = {
  id: string;
  name: string;
};

type CategoryResponse = {
  categories: {
    items: Category[];
  };
};

// Tipos relacionados con Guardados (Favoritos)
type SavedTracks = {
  href: string;
  items: {
    added_at: string;
    added_by: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    track: {
      album: {
        album_type: string;
        artists: {
          external_urls: {
            spotify: string;
          };
        }[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: Image[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
      };
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc: string;
      };
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
    };
  }[];
};


// Tipos relacionados con Tracks
type TrackDetails = {
  album: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
    };
  };
};

type SearchTracks = {
  href: string;
  items: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
      };
    };
  };
};

// Tipos relacionados con el Reproductor
type Player = {
  is_playing: boolean;
  item: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
      };
    };
  };
  progress_ms: number;
  timestamp: number;
  device: {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
  };
};

// Tipos relacionados con Artistas
type ArtistDetails = {
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Artist = {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};


// Tipos relacionados con Álbumes
type AlbumDetails = {
  album_type: string;
  artists: {
    external_urls: {
      spotify: string;
    };
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
};

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  items: Track[];
};



type Artist = {
  external_urls: { spotify: string };
  followers?: { href: string; total: number }; 
  genres?: string[];
  href: string;
  id: string;
  images?: Image[]; 
  name: string;
  popularity?: number;
  type: string;
  uri: string;
};

type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type AlbumDetails = {
  album_type: string;
  artists: Artist[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: Tracks;
  type: string;
  uri: string;
};

// Tipos relacionados con Resultados de Búsqueda
type SearchResults = {
  tracks: Tracks;
  artists: {
    href: string;
    items: Artist[];
  };
  albums: {
    href: string;
    items: Album[];
  };
  playlists: {
    href: string;
    items: Playlist[];
  };
};


