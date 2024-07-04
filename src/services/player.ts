let EmbedController: any = undefined;

// Inicializar el reproductor
export function initPlayer(el: HTMLElement): void {
  // @ts-ignore
  window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
    let options = {
      width: '100%',
      height: 80,
      uri: '' // Deja vacío para inicializar sin cargar una pista
    };
    let callback = (EmbedController_: any) => {
      EmbedController = EmbedController_;
    };
    IFrameAPI.createController(el, options, callback);
  };
}

// Reproducir una playlist
export function playPlaylist(uri: string | null): void {
  if (uri && EmbedController) {
    EmbedController.loadUri(uri);
    EmbedController.play();
  } else {
    console.error('Falta el URI de la playlist o el EmbedController no está inicializado.');
  }
}

// Cambiar de pista
export function playTrack(uri: string): void {
  if (EmbedController) {
    EmbedController.loadUri(uri);
    EmbedController.play();
  } else {
    console.error('EmbedController no está inicializado.');
  }
}

// Pausar o reanudar la reproducción
export function togglePlay(): void {
  if (EmbedController) {
    EmbedController.togglePlay();
  } else {
    console.error('EmbedController no está inicializado.');
  }
}
