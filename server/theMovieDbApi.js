import {movieDbApiKey, movieDbUrl} from './config';

class TheMovieDbApi {

    constructor() {
        this.apiParam = `api_key=${movieDbApiKey}`;
    }

    getMovieActors(movieId) {
        const response = await fetch(`${movieDbUrl}/movie/${movieId}/credits?${apiParam}`);
        const data = await response.json();
        return data.cast;
    }

    getActorsMovies(actorId) {
        const response = await fetch(`${movieDbUrl}/person/${actorId}/movie_credits?${this.apiParam}`);
        const data = await response.json();
        return data.cast;
    }
}