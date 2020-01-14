<template>
  <div>
    <no-ssr>
      <l-map
        ref="lmap"
        :zoom="8"
        :center="[56.9914044, -111.3603927]"
        @move="move"
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
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      latlng: [0, 0]
    }
  },
  methods: {
    move() {
      const center = this.$refs.lmap.mapObject.getCenter()
      this.latlng = [center.lat, center.lng]
      this.$emit('input', { lat: center.lat, lng: center.lng })
    }
  }
}
</script>

<style></style>
