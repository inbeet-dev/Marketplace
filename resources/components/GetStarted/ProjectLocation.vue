<template>
  <div>
    <no-ssr>
      <l-map
        :zoom="8"
        :center="[56.9914044, -111.3603927]"
        @move="ali"
        ref="lmap"
      >
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="latlng"></l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latlng: [0, 0]
    }
  },
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  name: 'MyAwesomeMap',
  methods: {
    ali(center) {
      // console.log(this.$refs.lmap.mapObject.getCenter(), center)
      const middle = this.$refs.lmap.mapObject.getCenter()
      this.latlng = [middle.lat, middle.lng]
      this.$emit('input', { lat: middle.lat, lng: middle.lng })
    }
  }
}
</script>

<style></style>
