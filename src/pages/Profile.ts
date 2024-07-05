export function renderProfile(username: string, userId: string, email: string, spotifyUrl: string, apiUrl: string): string {
  return `
      <h2>Display your Spotify profile data</h2>
      <p>Logged in as ${username}</p>
      <p>User ID: ${userId}</p>
      <p>Email: ${email}</p>
      <p>Spotify URL: <a href="${spotifyUrl}" target="_blank">${spotifyUrl}</a></p>
      <p>Link: <a href="${apiUrl}" target="_blank">${apiUrl}</a></p>
  `;
}
