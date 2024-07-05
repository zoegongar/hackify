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
  setupSearch(); 
  setupMenuToggle();
  setupMenuItems();
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
  document.getElementById("profileLink")!.addEventListener("click", (event) => {
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
  // Mostrar nombre de usuario
  document.getElementById("displayName")!.innerText = profile.display_name;
  document.getElementById("displayNameHover")!.innerText = profile.display_name;

  // Mostrar avatar del usuario
  const avatarElement = document.getElementById("imgAvatar") as HTMLImageElement;
  if (profile.images && profile.images.length > 0) {
    avatarElement.src = profile.images[0].url;
  } else {
    // Mostrar inicial del apellido si no hay imagen
    const initial = profile.display_name.charAt(0).toUpperCase();
    avatarElement.src = ""; 
    avatarElement.style.backgroundColor = "#1db954";
    avatarElement.innerText = initial; 
    avatarElement.classList.add('avatar-initial');
  }

  // Otros datos del perfil
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
        navigate('search', undefined, query);
      }
    }
  });
}

function setupMenuToggle(): void {
  const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
  const asideContainer = document.getElementById('aside-container') as HTMLElement;

  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      asideContainer.classList.remove('closing');
      asideContainer.classList.add('open');
    } else {
      asideContainer.classList.remove('open');
      asideContainer.classList.add('closing');
      setTimeout(() => {
        asideContainer.classList.remove('closing');
      }, 300);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 430) {
      asideContainer.classList.remove('open');
      menuToggle.checked = false;
    }
  });
}

function setupMenuItems(): void {
  const menuItems = document.querySelectorAll('.nav-aside-item');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
      menuToggle.checked = false;
      document.getElementById('aside-container')!.classList.remove('open');
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
