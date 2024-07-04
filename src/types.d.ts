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
  };
  type: string;
  uri: string;
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
}
