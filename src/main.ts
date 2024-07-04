// main.ts
import './main.css';
import { init as authenticatorInit, login, logout } from './auth';
import { setupNavigation, navigate } from './utils/navigation';
import { initPlayer, togglePlay } from './services/player';

const publicSection = document.getElementById("publicSection")!;
const privateSection = document.getElementById("privateSection")!;
const profileSection = document.getElementById("profileSection")!;
const actionsSection = document.getElementById("actionsSection")!;

async function init() {
  let profile: UserProfile | undefined;
  try {
    profile = await authenticatorInit();
    const playerElement = document.getElementById('embed-iframe')!;
    initPlayer(playerElement);
  } catch (error) {
    console.error(error);
  }

  initPublicSection(profile);
  initPrivateSection(profile);
  setupNavigation();
  navigate('home');
  setupThemeToggle();
  setupSearch(); // Configurar la búsqueda
}

function initPublicSection(profile?: UserProfile): void {
  document.getElementById("loginButton")!.addEventListener("click", login);
  renderPublicSection(!!profile);
}

function renderPublicSection(render: boolean): void {
  publicSection.style.display = render ? "none" : "block";
}

function initPrivateSection(profile?: UserProfile): void {
  renderPrivateSection(!!profile);
  initMenuSection();
  initProfileSection(profile);
  initActionsSection();
}

function renderPrivateSection(isLogged: boolean) {
  privateSection.style.display = isLogged ? "block" : "none";
}

function initMenuSection(): void {
  document.getElementById("profileButton")!.addEventListener("click", (event) => {
    event.preventDefault();
    navigate('profile');
  });
  document.getElementById("logoutButton")!.addEventListener("click", logout);
}

function initProfileSection(profile?: UserProfile): void {
  renderProfileSection(!!profile);
  if (profile) {
    renderProfileData(profile);
  }
}

function renderProfileSection(render: boolean) {
  profileSection.style.display = render ? "none" : "block";
}

function renderProfileData(profile: UserProfile) {
  document.getElementById("displayName")!.innerText = profile.display_name;
  document.getElementById("id")!.innerText = profile.id;
  document.getElementById("email")!.innerText = profile.email;
  document.getElementById("uri")!.innerText = profile.uri;
  document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url")!.innerText = profile.href;
  document.getElementById("url")!.setAttribute("href", profile.href);
}

function initActionsSection(): void {
  document.getElementById("playButton")!.addEventListener("click", () => {
    togglePlay();
  });
  renderActionsSection(true);
}

function renderActionsSection(render: boolean) {
  actionsSection.style.display = render ? "block" : "none";
}

function setupThemeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;

  darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  });
}

function setupSearch(): void {
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        navigate('search', undefined, query); // Navegar a la vista de búsqueda
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
