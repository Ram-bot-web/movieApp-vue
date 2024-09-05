<template>
  <div class="home">
    <!-- <div class="feature-card">
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
    </div> -->

    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :speed="3000"
      :coverflowEffect="{
        rotate: 0,
        stretch: 10,
        depth: 300,
        modifier: 1,
        slideShadows: false,
        scale: 1,
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="false"
      :modules="modules"
      :navigation="true"
      :loop="true"
      class="mySwiper"
    >
      <swiper-slide>
        <img src="@/assets/Avengers.jpg" />
        <div>
          <h1 style="position: absolute">Naruto</h1>
        </div> </swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/Batman.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/Dont.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/Hobbit.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/mancipation.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/Master.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="@/assets/sinister.jpg" /></swiper-slide 
      >
      <!-- <swiper-slide><img src="https://swiperjs.com/demos/images/nature-9.jpg"/></swiper-slide> -->
    </swiper>

    
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Search Movie" v-model="search" />
      <input type="submit" value="Search" />
    </form>

    <!-- <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div> -->

    <h1 class="content-title">Movies</h1>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbId">
        <router-link :to="'/movie/' + movie.imdbId" class="movie-link">
          <div class="product-image">
            <img
              :src="movie?.imageSet?.verticalPoster?.w720"
              alt="Movie Poster"
            />
            <div class="type">{{ movie?.showType }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie?.releaseYear }}</p>
            <h3>{{ movie.title }}</h3>
            <div class="rating-container"><span class="rating">Rating:{{ movie?.rating }}/100 </span></div>
            <!-- <div v-for="stream in movie.streamingOptions?.in" :key="stream.type"><img alt="stream" class="stream-img" :src="stream?.service?.imageSet?.lightThemeImage" /></div> -->
            <div><img alt="stream" class="stream-img" :src="movie?.streamingOptions?.hasOwnProperty('in') ? movie?.streamingOptions?.in[0]?.service?.imageSet?.lightThemeImage : none " /></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import env from "@/env";
import { ref, toRaw, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// import axios from "axios";
// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import { useMovieStore } from "@/stores/useMovieStore";
import "@/styles/style.scss";
import none from '@/assets/none.png'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const search = ref("");
    const movies = ref([]);
    const movieStore = useMovieStore();

    movies.value = movieStore.movies;
    watch(
      () => movieStore.movies,
      (newMovies) => {
        console.log("Movies have changed:", toRaw(newMovies.shows));
        let initial = toRaw(newMovies.shows);
        initial && initial?.length > 0
          ? (movies.value = initial)
          : (movies.value = toRaw(newMovies));
      }
    );

    watch(async () => await movieStore.initialFetch());
    const SearchMovies = async () => {
      if (search.value != "") {
        console.log(search.value);
        // fetch(`https://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}`)
        //   .then((Response) => Response.json())
        //   .then((data) => {
        //     movies.value = data?.Search;
        //   })
        //   .catch((err) => console.log(err.message));

        // const options = {
        //   method: "GET",
        //   url: "https://streaming-availability.p.rapidapi.com/shows/search/title",
        //   params: {
        //     country: "in",
        //     title: `${search.value}`,
        //   },
        //   headers: {
        //     "x-rapidapi-key":
        //       "79efc24587mshaefa7a1be4a3ad5p1cb9c5jsn2feea23b2d7f",
        //     "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        //   },
        // };

        // axios.request(options)
        // .then(function (response) {
        //   console.log(response.data);
        //   movies.value = response.data;
        // })
        // .catch(function (error) {
        //   console.error(error);
        // });

        await movieStore.fetchSearch(search.value);
      }
    };

    return {
      search,
      movies,
      none,
      SearchMovies,
      modules: [Autoplay, EffectCoverflow, Pagination, Navigation],
    };
  },
};
</script>

<style lang="scss">
// .home {
//   .feature-card {
//     position: relative;

//     .featured-img {
//       display: block;
//       width: 100%;
//       height: 300px;
//       object-fit: cover;

//       position: relative;
//       z-index: 0;
//     }

//     .detail {
//       position: absolute;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: rgba(0, 0, 0, 0.6);
//       padding: 16px;
//       z-index: 1;

//       h3 {
//         color: #fff;
//         margin-bottom: 16px;
//       }

//       p {
//         color: #fff;
//       }
//     }
//   }

//   .search-box {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     padding: 16px;

//     input {
//       display: block;
//       appearance: none;
//       border: none;
//       outline: none;
//       background: none;

//       &[type="text"] {
//         width: 100%;
//         color: #fff;
//         background-color: #496583;
//         font-size: 20px;
//         padding: 10px 16px;
//         border-radius: 8px;
//         margin-bottom: 15px;
//         transition: 0.4s;

//         &::placeholder {
//           color: #f3f3f3;
//         }

//         &:focus {
//           box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
//         }
//       }

//       &[type="submit"] {
//         width: 100%;
//         max-width: 300px;
//         background-color: #42b883;
//         padding: 16px;
//         border-radius: 8px;
//         color: #fff;
//         font-size: 20px;
//         text-transform: uppercase;
//         transition: 0.4s;

//         &:active {
//           background-color: #3b8070;
//         }
//       }
//     }
//   }

//   .content-title{
//     margin: 0px 8px;
//     padding: 16px 8px;
//   }

//   .movies-list {
//     display: flex;
//     flex-wrap: wrap;
//     margin: 0px 8px;

//     .movie {
//       max-width: 50%;
//       // flex: 1 1 50%;
//       flex: 1 1 20%;
//       padding: 16px 8px;

//       .movie-link {
//         display: flex;
//         flex-direction: column;
//         height: 100%;

//         .product-image {
//           position: relative;
//           display: block;

//           img {
//             display: block;
//             width: 100%;
//             height: 275px;
//             object-fit: cover;
//           }

//           .type {
//             position: absolute;
//             padding: 8px 16px;
//             background-color: #42b883;
//             color: #fff;
//             bottom: 16px;
//             left: 0px;
//             text-transform: capitalize;
//           }
//         }

//         .detail {
//           background-color: #496583;
//           padding: 16px 8px;
//           flex: 1 1 100%;
//           border-radius: 0px 0px 8px 8px;

//           .year {
//             color: #aaa;
//             font-size: 14px;
//           }

//           h3 {
//             color: #fff;
//             font-weight: 600;
//             font-size: 18px;
//           }
//         }
//       }
//     }
//   }

//   .swiper {
//     width: 100%;
//     padding-top: 50px;
//     padding-bottom: 50px;
//   }

//   .swiper-slide {
//     background-position: center;
//     background-size: cover;
//     width: 700px;
//     height: 300px;
//   }

//   .swiper-slide img {
//     display: block;
//     width: 100%;
//   }

//   .home .swiper-slide {
//     width: 800px !important;
//   }
// }
</style>
