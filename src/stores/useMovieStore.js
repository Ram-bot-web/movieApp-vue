import { defineStore } from 'pinia';
// import { setmovies } from './reducers/movieReducers';
import { fetchSearch } from './actions/movieActions';
// import { setmovies } from './reducers/movieReducers';

export const useMovieStore = defineStore('movie', {
    state: () => ({
        movies: [],
    }),
    actions: {
        async fetchSearch(movie) {
            try {
              await fetchSearch(this, movie); // Pass the store instance as the first argument
            } catch (error) {
              console.error('Fetch search error:', error);
            }
          },
        setmovies(movies) {
            this.movies = movies;
        },
    },
})