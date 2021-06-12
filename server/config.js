import { config } from 'dotenv';
config();
export const movieDbApiKey = process.env.MOVIE_DB_API_KEY;
export const movieDbUrl = process.env.MOVIE_DB_URL;