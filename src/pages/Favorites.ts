import { fetchSavedTracks } from "../services/favoritesService";
import { playTrack } from "../services/player";
import "./Favorite.css";

export async function renderFavorites(): Promise<string> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return `<p>Inicie sesión para ver sus canciones favoritas.</p>`;
  }

  const savedTracks = await fetchSavedTracks(token);
  if (savedTracks.items.length === 0) {
    return `<p>No tienes canciones guardadas en tu biblioteca.</p>`;
  }

  return `
    <h2 class="favorites">Favorites</h2>
    <ul id="favoritesList">
      ${savedTracks.items
        .map(
          (track) => `
        <li data-uri="${track.track.uri}" class="favorite-track">
          ${
            track.track.album.images.length > 0
              ? `<img src="${track.track.album.images[0].url}" alt="${track.track.name}" class="favorite-track-image" />`
              : ""
          }
          <p><strong>${track.track.name}</strong> by ${track.track.artists
            .map((artist) => artist.name)
            .join(", ")}</p>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

export function addFavoritesClickHandlers() {
  document.querySelectorAll(".favorite-track").forEach((item) => {
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
