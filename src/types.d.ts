type Image = {
  url: string;
  height: number;
  width: number;
};

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

type Category = {
  id: string;
  name: string;
};

type CategoryResponse = {
  categories: {
    items: Category[];
  };
};

type PlaylistResponse = {
  playlists: {
    items: Playlist[];
  };
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

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

type PlaylistRequest = {
  items: Playlist[];
};

type Category = {
  items: {
    id: string;
    name: string;
  }[];
};

type Playlist = {
  items: {
    id: string;
    name: string;
  }[];
};

type UserPlaylist = {
  items: {
    collaborative: boolean;
    description: string;
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
      };
    };
  };
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
        };
      };
    };
  };
};

type PlaylistTracks = {
  href: string;
  items: PlaylistTrack[];
};

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

type ArtistDetails = {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

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
      }[];
    };
    name: string;
    uri: string;
  };
};

type Image = {
  url: string;
  height: number;
  width: number;
};

type PlaylistItem = {
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
    items: TrackItem[];  // Añadir esta línea
  };
  type: string;
  uri: string;
};

type Playlist = {
  items: PlaylistItem[];
};

type TrackItem = {
  track: {
    uri: string;
    name: string;
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
      }[];
    };
  };
};

type UserPlaylistResponse = {
  items: PlaylistItem[];
};
