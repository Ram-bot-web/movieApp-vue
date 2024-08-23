<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img
          alt="Naruto Poster"
          src="./../assets/Naruto1.jpg"
          class="featured-img"
        />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            leader of his village.
          </p>
        </div>
      </router-link>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Search Movie" v-model="search" />
      <input type="submit" value="Search" />
    </form>

    <div class="movie-list">
      <div class="movie" v-for="movie in movies" :key="movie?.imdbID">
        <router-link :to="`/movie/${movie.imdbID}`" class="movie-link">
          <div class="product-image">
            <img :src="movie?.Poster" alt="Movie Poster" />
            <div class="type">{{ movie?.Type }}</div>
            <div class="detail"> {{ movie?.Year }}</div>
            <h3>{{ movie?.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import env from "@/env";
import { ref } from "vue";

export default {
  setup() {
    const search = ref("");
    const movies = ref([]);

    const SearchMovies = () => {
      if (search.value != "") {
        console.log(search.value);
        fetch(`https://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}`)
          .then((Response) => Response.json())
          .then((data) => {
            movies.value = data?.Search;
          })
          .catch((err) => console.log(err.message));
      }
    };

    return {
      search,
      movies,
      SearchMovies,
    };
  },
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .feature-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
      padding: 16px;
      z-index: 1;
    }

    h3 {
      color: #fff;
      margin: 16px;
    }

    p {
      color: #fff;
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;
    }

    input[type="text"] {
      width: 100%;
      color: #fff;
      background-color: #496583;
      font-size: 20px;
      padding: 10px 16px;
      border-radius: 8px;
      margin-bottom: 15px;
      transition: 0.4s;

      &::placeholder {
        color: #f3f3f3;
      }

      &:focus {
        box-shadow: 0px 3px 6px rgba($color: #000000, $alpha: 0.2);
      }
    }

    input[type="submit"] {
      width: 100%;
      max-width: 300px;
      background-color: #42b883;
      padding: 16px;
      border-radius: 8px;
      color: #fff;
      font-size: 20px;
      text-transform: uppercase;
      transition: 0.4s;

      &:active {
        background-color: #3b8070;
      }
    }
  }
}
</style>
