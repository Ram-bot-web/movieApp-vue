<template>
  <div class="image-backdrop">
    <img
      :src="movie?.imageSet?.horizontalBackdrop?.w1080"
      alt="Movie Poster"
      style="opacity: 0.5"
    />
  </div>
  <div class="movie-detail">
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.releaseYear }}</p>
    <img
      :src="movie?.imageSet?.verticalPoster?.w720"
      alt="Movie Poster"
      class="featured-img"
    />
    <p>{{ movie.Plot }}</p>
  </div>
  <div class="movie detail1 backdrop">
    <div class="content">
      <div class="meta">
        <span v-for="tags in movie?.genres" :key="tags.id">{{
          tags.name
        }}</span>
      </div>
      <p class="description">
        {{ movie.overview }}
      </p>
      <p class="directors">
        Director :
        <span
          class="highlight"
          v-for="(dir, index) in movie?.directors"
          :key="index"
          >{{ dir + (index < movie?.directors.length - 1 ? ", " : ".") }}</span
        >
      </p>
      <br />
      <p class="cast">
        Cast :
        <span
          class="highlight"
          v-for="(cast, index) in movie?.cast"
          :key="index"
          >{{ cast + (index < movie?.cast.length - 1 ? ", " : ".") }}</span
        >
      </p>
      <p class="cast">Streaming :</p>
      <div>
        <a
          v-for="stream in movie?.streamingOptions?.in"
          :key="stream.type"
          :href="stream?.link"
          target="_blank"
          ><img
            alt="stream"
            class="stream-img"
            :src="
              stream?.service?.imageSet?.lightThemeImage
                ? stream?.service?.imageSet?.lightThemeImage
                : none
            "
        /></a>
      </div>
    </div>
  </div>
  <!-- <div class="backdrop">
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
      <p class="description">
        A New Jersey construction worker goes from regular guy to aspiring spy
        when his long-lost high school sweetheart recruits him for an espionage
        mission.
      </p>
      <button class="get-started">Get Started</button>
    </div>
  </div> -->
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import none from "@/assets/none.png";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      const options = {
        method: "GET",
        url: `https://streaming-availability.p.rapidapi.com/shows/${route.params.id}`,
        params: {
          series_granularity: "episode",
          output_language: "en",
        },
        headers: {
          "x-rapidapi-key":
            "79efc24587mshaefa7a1be4a3ad5p1cb9c5jsn2feea23b2d7f",
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          movie.value = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      // fetch(
      //   `http://www.omdbapi.com/?apikey=${env.apiKey}&i=${route.params.id}&plot=full`
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     movie.value = data;
      //   });
    });

    return {
      movie,
      none,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;
  position: absolute;
  top: 10%;
  z-index: 2;

  h2 {
    color: #fff;
    // font-size: 28px;
    font-size: 50px;
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
  height: 450px;
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 2;
}

.backdrop {
  // position: relative;
  // width: 100%;
  // height: 600px; /* Adjust based on your needs */
  // background-image: url(),
  //   linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1));
  // background-size: cover;
  // background-blend-mode: overlay;
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-end;
  padding: 20px;
  color: white;

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
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 600;
  }

  .description {
    margin-bottom: 20px;
    padding: 2% 0%;
  }

  .directors {
    font-weight: 600;
    padding: 2% 0%;
  }

  .cast {
    font-weight: 600;
    padding: 2% 0%;
  }

  .stream-img {
    padding: 5% 5%;
  }
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
