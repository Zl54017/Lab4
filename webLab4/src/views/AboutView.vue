<template>
    <div class="about-page">
      <div class="center">
        <h1>About Page</h1>
        <p>
          Ova stranica omogućava pregled popularnih filmova. 
          Cilj je pružiti jednostavno i ugodno iskustvo za ljubitelje filmova.
        </p>
      </div>
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <p class="copyright">© 2025 PopularMovieDatabase. All rights reserved.</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .about-page {
    text-align: center;
    padding: 20px;
  }
  
  .center {
    margin-bottom: 20px;
  }
  
  .logo-container {
    margin-top: 30px;
  }
  
  .logo {
    width: 200px;
    height: auto;
    margin-bottom: 10px;
  }
  
  .copyright {
    font-size: 14px;
    color: #777;
  }
  </style>
  