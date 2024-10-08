import axios from "axios";
export const fetchSearch = async ({ actions },) => {
    // Imagine an API call for login
    try {
        const options = {
            method: "GET",
            url: "https://streaming-availability.p.rapidapi.com/shows/search/title",
            params: {
                country: "in",
                title: {},
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
                actions.setmovies(response.data);// Call the reducer function (setUser)
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error('Login error:', error);
    }
};