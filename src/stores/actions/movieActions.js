import axios from "axios";

export const initialFetch = async (store) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
            params: {
              country: 'in',
              series_granularity: 'show',
              order_direction: 'asc',
              order_by: 'original_title',
              genres_relation: 'and',
              output_language: 'en'
            },
            headers: {
              'x-rapidapi-key': '79efc24587mshaefa7a1be4a3ad5p1cb9c5jsn2feea23b2d7f',
              'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
            }
          };

        axios.request(options)
            .then(function (response) {
                console.log(response.data);
                store.setmovies(response.data);// Call the reducer function (setUser)
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error('Login error:', error);
    }
}

export const fetchSearch = async (store, movie) => {
    // Imagine an API call for login
    debugger
    try {
        const options = {
            method: "GET",
            url: "https://streaming-availability.p.rapidapi.com/shows/search/title",
            params: {
                country: "in",
                title: movie,
            },
            headers: {
                "x-rapidapi-key":
                    "79efc24587mshaefa7a1be4a3ad5p1cb9c5jsn2feea23b2d7f",
                "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            },
        };

        axios.request(options)
            .then(function (response) {
                console.log(response.data);
                store.setmovies(response.data);// Call the reducer function (setUser)
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error('Login error:', error);
    }
};