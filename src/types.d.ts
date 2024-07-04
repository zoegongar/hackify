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
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

type Playlist = {
  name: string;
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
      is_local: boolean;
      primary_color: string;
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
    is_local: boolean;
    primary_color: string;
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
