<script setup>
import { useRatingStore } from '@/stores/ratingStore';
import { ref, onMounted } from 'vue'

const { title, releaseDate, posterPath, movieId } = defineProps({
  title: String,
  releaseDate: String,
  posterPath: String,
  movieId: Number,
})

const emit = defineEmits(['feedback'])
const ratingStore = useRatingStore()

const userFeedback = ref('Not rated')

const handleFeedback = (feedback) => {
  userFeedback.value = feedback === 'like' ? 'You liked this movie' : 'You disliked this movie'
  ratingStore.setRating(movieId, (feedback === 'like' ? 'like' : 'dislike'))
  emit('feedback', feedback)
}

onMounted(() => {
  const movieRating = ratingStore.ratings[movieId]
  if (movieRating) {
    userFeedback.value = movieRating === 'like' ? 'You liked this movie' : 'You disliked this movie'
  }
})

</script>

<template>
  <div class="card">
    <img
      v-if="posterPath"
      :src="`https://image.tmdb.org/t/p/w500${posterPath}`"
      :alt="title"
      class="card-img-top"
    />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">Release Date: {{ releaseDate }}</p>

      <div class="d-flex justify-content-between">
        <input
          type="radio"
          :id="'like-' + movieId"
          value="You liked this movie"
          v-model="userFeedback"
          @change="handleFeedback('like')"
        />
        <label :for="'like-' + movieId" class="btn btn-success w-100">Like</label>

        <input
          type="radio"
          :id="'dislike-' + movieId"
          value="You disliked this movie"
          v-model="userFeedback"
          @change="handleFeedback('dislike')"
        />
        <label :for="'dislike-' + movieId" class="btn btn-danger w-100">Dislike</label>
      </div>

      <p class="feedback-text mt-3">{{ userFeedback }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background-color: black;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 300px;
  object-fit: scale-down;
}

.feedback-text {
  color: white;
  font-size: 14px;
  text-align: center;
}

input[type='radio'] {
  display: none;
}

input[type='radio']:checked + label {
  opacity: 0.8;
  transform: scale(1.05);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>
