<template>
  <div class="news-view">
    <transition :name="transition">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
    </transition>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
export default {
  components: {
    Item
  },
  props: {
    type: 'fresh'
  },
  data () {
    return {
      transition: 'fade',
      displayedItems: this.$store.getters.activeItems,
    }
  },
  computed: {
  },
  beforeMount () {
    // if (this.$root._isMounted) {
      this.loadItems()
    // }
  },
  beforeDestroy () {
  },
  methods: {
    loadItems () {
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: 'featured'
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-top 45px
.news-list-nav, .news-list
  background-color #fff
  border-radius 2px
.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc
.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0
.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)
.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)
.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)
.item-enter
  opacity 0
  transform translate(30px, 0)
.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)
@media (max-width 600px)
  .news-list
    margin 10px 0
</style>