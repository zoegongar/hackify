import {
  getRandomPlaylists,
  getPlaylistsCache,
  setPlaylistsCache,
} from "../services/playlistsService";
import { playTrack } from "../services/player";
import { getPlaylistDetails } from "../services/spotifyAPI";
import { navigate } from "../utils/navigation";
import './Home.css';

export async function renderHome(): Promise<string> {
  const playlists: Playlist[] = getPlaylistsCache();
  if (playlists.length === 0) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return `<p>Inicie sesión para ver las listas de reproducción.</p>`;
    }
    const newPlaylists = await getRandomPlaylists(token);
    setPlaylistsCache(newPlaylists);
    return renderPlaylistsHTML(newPlaylists);
  }
  return renderPlaylistsHTML(playlists);
}

function renderPlaylistsHTML(playlists: Playlist[]): string {
  return `
        <h2 class="playlists">Playlists <button id="refreshButton"><img id="refresh-button-img" src="src/img/autorenew.svg" alt="actualizar listas"></button></h2>
        <ul id="playlists" class="container-home">
            ${playlists
              .map(
                (playlist) => `
                <li data-id="${playlist.id}" class="playlist-item">
                    ${
                      playlist.images && playlist.images.length > 0
                        ? `<img class="playlist-image" src="${playlist.images[0].url}" alt="${playlist.name}" />`
                        : ""
                    }
                    <p class="playlist-name">${playlist.name}</p>
                </li>
            `
              )
              .join("")}
        </ul>
    `;
}

export async function renderPlaylistDetails(
  playlistId: string
): Promise<string> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return `<p>Inicie sesión para ver los detalles de la lista de reproducción.</p>`;
  }

  const playlist = await getPlaylistDetails(playlistId, token);
  console.log("Playlist details:", playlist);

  const firstTrackUri = playlist.tracks.items[0]?.track.uri || null;
  if (firstTrackUri) {
    playTrack(firstTrackUri);
  }

  return `
    <div class="playlist-details">
      <div class="playlist-header">
        <img class="playlist-image" src="${playlist.images[0].url}" alt="${playlist.name}" />
        <h2 class="back-to-playlists">Playlist / ${playlist.name}</h2>
      </div>
      <ul class="playlist-tracks">
        ${playlist.tracks.items
          .map(
            (item) => `
            <li data-uri="${item.track.uri}" class="track-item">
              ${item.track.name}
            </li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;
}

export function addHomePlaylistClickHandlers() {
  document.querySelectorAll(".playlist-item").forEach((item) => {
    item.addEventListener("click", function (this: HTMLElement) {
      const playlistId = this.getAttribute("data-id");
      if (playlistId) {
        navigate("playlist", playlistId);
      } else {
        console.error("No se pudo obtener el ID de la playlist");
      }
    });
  });
}

export function addHomeRefreshButtonHandler() {
  const refreshButton = document.getElementById("refreshButton");
  if (refreshButton) {
    refreshButton.addEventListener("click", async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const playlists = await getRandomPlaylists(token);
        setPlaylistsCache(playlists);
        document.getElementById("mainContent")!.innerHTML = await renderHome();
        addHomePlaylistClickHandlers();
        addHomeRefreshButtonHandler();
      }
    });
  }
}

export function addBackToPlaylistsHandler() {
  const backToPlaylists = document.querySelector(".back-to-playlists");
  if (backToPlaylists) {
    backToPlaylists.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("home");
    });
  }
}

export function addTrackClickHandlers() {
  document.querySelectorAll(".track-item").forEach((item) => {
    item.addEventListener("click", function (this: HTMLElement) {
      const trackUri = this.getAttribute("data-uri");
      if (trackUri) {
        playTrack(trackUri);
      } else {
        console.error("No se pudo obtener el URI de la canción");
      }
    });
  });
}