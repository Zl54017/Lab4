import { defineStore } from 'pinia'

export const useRatingStore = defineStore('rating', {
  state: () => ({
    ratings: {},
  }),
  actions: {
    
    setRating(movieId, rating) {
      this.ratings[movieId] = rating 
    },
    getLikes() {
      let likeCount = 0
      for (const rating of Object.values(this.ratings)) {
        if (rating === 'like') {
          likeCount++
        }
      }
      return likeCount
    },
    getDislikes(){
      let dislikeCount = 0
      for (const rating of Object.values(this.ratings)) {
        if (rating === 'like') {
          dislikeCount++
        }
      }
      return dislikeCount
    },
  },
})
