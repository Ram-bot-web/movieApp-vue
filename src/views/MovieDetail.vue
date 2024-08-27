<template>
  <div  class="image-backdrop">
    <img :src="movie.Poster" alt="Movie Poster" style="opacity: 0.5;"/>
  </div>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p>{{ movie.Plot }}</p>
  </div>
  <div class="backdrop">
  <div class="content">
    <h1 class="title"><span class="highlight">THE</span> UNION</h1>
    <div class="meta">
      <span>2024</span>
      <span>PG-13</span>
      <span>Movie</span>
      <span>Comedies</span>
      <span>Action</span>
      <span>Adventure</span>
    </div>
    <p class="description">A New Jersey construction worker goes from regular guy to aspiring spy when his long-lost high school sweetheart recruits him for an espionage mission.</p>
    <button class="get-started">Get Started</button>
  </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      fetch(
        `http://www.omdbapi.com/?apikey=${env.apiKey}&i=${route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
        });
    });

    return {
      movie,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}

.image-backdrop {
  position: relative;
  width: 100%;
  height: 400px; /* Adjust based on your needs */
  overflow: hidden;
}

.image-backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the entire div */
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.image-backdrop::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%; /* Adjust the height of the fade effect */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 2;
}

.backdrop {
  position: relative;
  width: 100%;
  height: 600px; /* Adjust based on your needs */
  background-image: url(), 
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1));
  background-size: cover;
  background-blend-mode: overlay;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px;
  color: white;
}

.content {
  max-width: 400px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

.highlight {
  color: #f9a825;
}

.meta {
  margin: 15px 0;
}

.meta span {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 14px;
}

.description {
  margin-bottom: 20px;
}

.get-started {
  background-color: #e50914;
  border: none;
  padding: 12px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.get-started:hover {
  background-color: #f40612;
}
</style>
