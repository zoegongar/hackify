// @ts-nocheck
// No he conseguido lo de los tipos en este archivo 

import './Album.css';
import { getAlbumDetails } from '../services/spotifyAPI';
import { playTrack } from '../services/player';

export async function renderAlbumDetails(albumId: string): Promise<string> {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return `<p>Inicie sesión para ver los detalles del álbum.</p>`;
  }

  const album: AlbumDetails = await getAlbumDetails(albumId, token);
  console.log('Album details:', album);

  let html = `<h2>${album.name} by ${album.artists.map(artist => artist.name).join(', ')}</h2>`;
  html += `<img src="${album.images[0].url}" alt="${album.name}" style="width: 200px;" />`;
  html += '<ul>';
  album.tracks.items.forEach((track: Track) => {
    html += `<li data-uri="${track.uri}" class="track-item">${track.name}</li>`;
  });
  html += '</ul>';

  return html;
}

export function addAlbumTrackClickHandlers() {
  document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', function (this: HTMLElement) {
      const trackUri = this.getAttribute('data-uri');
      if (trackUri) {
        playTrack(trackUri);
      } else {
        console.error('No se pudo obtener el URI de la canción');
      }
    });
  });
}
