<template>
  <div class="feed-item" v-if="item.type === 'video'">
    <h2><a :href="item.link">{{ item.caption.text }}</a></h2>
    
    <video 
      :width="item.videos.standard_resolution.width" 
      :height="item.videos.standard_resolution.height"  controls>
      <source
        :src="item.videos.standard_resolution.url" type="video/mp4" />
    </video>

    <span class="time"><a :href="item.link">{{ item.created_time | timeAgo }} ago</a></span>
    <span class="meta">Likes: {{ item.likes.count }}. Comments: {{ item.comments.count }}</span>
    <button v-on:click="addToFeatured(item.id)">Add to Featured</button>
  </div>
  <div class="feed-item" v-else>
    <h2><a :href="item.link">{{ item.caption.text }}</a></h2>
    <img
      :src="item.images.standard_resolution.url"
      :width="item.images.standard_resolution.width"
      :height="item.images.standard_resolution.height"
    />
    <span class="time"><a :href="item.link">{{ item.created_time | timeAgo }} ago</a></span>
    <span class="meta">Likes: {{ item.likes.count }}. Comments: {{ item.comments.count }}</span>
    <button v-on:click="addToFeatured(item.id)">Add to Featured</button>
  </div>
</template>

<script>
import { timeAgo } from '../util/filters'
export default {
  name: 'Item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  },
  methods: {
    addToFeatured (id) {
      this.$store.dispatch('ITEM_ADD_TO_FEATURED', { id })
    }
  }
}
</script>

<style lang="stylus">
.feed-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  .meta
    display block
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
  button
    background-color blue
    color white
    font-size 1em
</style>