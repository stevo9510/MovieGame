const { config } = require("dotenv");
config();
const movieDbApiKey = process.env.MOVIE_DB_API_KEY;
const movieDbUrl = process.env.MOVIE_DB_URL;
const movieDbImageUrl = process.env.MOVIE_DB_IMAGE_URL;

module.exports = {
    movieDbApiKey,
    movieDbUrl,
    movieDbImageUrl,
};
