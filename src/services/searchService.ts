// services/searchService.ts
import { search } from '../services/spotifyAPI';

export async function fetchSearchResults(query: string, token: string, type: string = 'track,album,playlist,artist'): Promise<SearchResults> {
  try {
    const searchResults = await search(query, token, type);
    console.log('Search results fetched from API:', searchResults);
    return searchResults;
  } catch (error) {
    console.error('Error fetching search results', error);
    throw error;
  }
}
