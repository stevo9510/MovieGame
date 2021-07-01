const { config } = require("dotenv");
config();
const movieDbApiKey = process.env.MOVIE_DB_API_KEY;
const movieDbUrl = process.env.MOVIE_DB_URL;

module.exports = {
    movieDbApiKey,
    movieDbUrl,
};
