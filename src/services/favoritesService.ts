import { getSavedTracks } from '../api/spotify';

export const fetchSavedTracks = async (token: string): Promise<SavedTracks> => {
  try {
    const savedTracks = await getSavedTracks(token);
    console.log('Saved tracks fetched from API:', savedTracks);
    return savedTracks;
  } catch (error) {
    console.error('Error fetching saved tracks', error);
    return { href: '', items: [] };
  }
};
