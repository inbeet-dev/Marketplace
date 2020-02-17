<template>
  <div>
    <no-ssr>
      <l-map ref="lmap" :zoom="8" :center="center" @move="move">
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
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      latlng: [0, 0],
      center: [56.9914044, -111.3603927]
    }
  },
  methods: {
    move() {
      const center = this.$refs.lmap.mapObject.getCenter()
      this.latlng = [center.lat, center.lng]
      this.$emit('input', { lat: center.lat, long: center.lng })
    }
  },
  watch: {
    value(val) {
      this.center = [val.lat, val.long]
    }
  }
}
</script>

<style></style>
