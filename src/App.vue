<template>
  <header>
    <img src="@/assets/Movie.png" alt="Logo" style="width: 40px" />
    <router-link to="/">
      <h1><span>IMDB</span>Movies</h1>
    </router-link>
    <div>
      <!-- <img src="" alt="avatar" /> -->
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;

  &::selection {
    background: transparentize($color: #42b883, $amount: 0.5);
  }

  body {
    // background-color: #35495e;
    background-color: #151c1f;
  }

  a {
    text-decoration: none;
  }

  header {
    display: flex;
    align-items: center;
    // justify-content: center;
    justify-content: space-between;
    padding: 10px 16px;
    // background-color: #2c3e50;
    background-color: #080b0f;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    position: relative;

    a {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-size: 24px;
      color: white;
    }

    // img{
    //   width: 40px;
    // border-radius: 50%;
    // height: 40px;
    // vertical-align: middle;
    // object-fit: cover;
    // }
  }

  h1 {
    color: #fff;
    font-size: 28px;

    span {
      color: #42b883;
    }
  }
}
</style>
