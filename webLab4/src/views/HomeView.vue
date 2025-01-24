<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { useRatingStore } from '@/stores/ratingStore'

const movies = ref([]) 
const displayedMovies = ref([]) 
const totalMovies = 50 

const API_KEY = '57172b2da97ca42692c6a03eae699d2b'
const BASE_URL = 'https://api.themoviedb.org/3' 

const ratingStore = useRatingStore()

const liked = computed(() =>
  Object.values(ratingStore.ratings).filter(rating => rating === 'like').length
)
const disliked = computed(() =>
  Object.values(ratingStore.ratings).filter(rating => rating === 'dislike').length
)

const unrated = ref(0)
let interval = null

const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    )
    const data = await response.json()
    movies.value = data.results.slice(0, totalMovies)
    displayedMovies.value = movies.value.slice(0, 5)
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

onMounted(async () => {
  await fetchMovies(); 
  interval = setInterval(() => {
    unrated.value = movies.value.filter(movie => !ratingStore.ratings[movie.id]).length
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval)
})

const loadMoreMovies = () => {
  const currentLength = displayedMovies.value.length
  if (currentLength < movies.value.length) {
    displayedMovies.value = movies.value.slice(0, currentLength + 5)
  }
}

const handleFeedback = (movieId, type) => {
  ratingStore.setRating(movieId, type)
}
</script>

<template>
  <h3>Top 20 Movies This Week</h3>
  <p>Liked Movies: {{ liked }}</p>
  <p>Disliked Movies: {{ disliked }}</p>
  <p>Unrated Movies: {{ unrated }}</p>  

  <div class="container text-center">
    <div class="row align-items-start">
      <div v-for="movie in displayedMovies" :key="movie.id" class="col-md-4 mb-4">
        <MovieCard
          :title="movie.title"
          :release-date="movie.release_date"
          :poster-path="movie.poster_path"
          :movie-id="movie.id"
          @feedback="handleFeedback(movie.id, $event)"
        />
      </div>
    </div>

    <div v-if="displayedMovies.length < movies.length" class="d-flex justify-content-center">
      <button @click="loadMoreMovies" class="btn btn-primary mt-4">Load More</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}

button {
  background-color: black;
  border-color: black;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s; 
  outline: none;
}

button:hover {
  background-color: #555;
  border-color: #555;
  color: white;
}
</style>
