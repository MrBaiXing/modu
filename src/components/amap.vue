<template>
  <div class="amap-page-container">
    <!-- <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box> -->
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      :events="events"
    >
      <el-amap-marker
        :position="marker.position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
      ></el-amap-marker>
    </el-amap>
    <div class="toolbar">
      position: [{{ lng }}, {{ lat }}] address: {{ address }}
    </div>
  </div>
</template>

<style>
.el-vue-amap-container.amap-demo {
  width: 960px;
  height: 516px;
}
.search-box {
  position: absolute;
  top: 5px;
  left: 20px;
}
.amap-page-container {
  position: relative;
}
</style>

<script>
export default {
  name: "mymap",
  data: function() {
    let self = this;
    return {
      zoom: 12,
      center: [121.52014, 31.198862],
      searchOption: {
        city: "",
        citylimit: true
      },
      marker: {
        position: [121.52014, 31.198862]
      },
      mapInfo: {
        address: "",
        lng: "",
        lat: ""
      },
      address: "",
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.mapInfo.lat = lat;
          self.mapInfo.lng = lng;
          self.$emit("listenToMap", self.mapInfo);
          self.marker.position = [lng, lat];
          // 这里通过高德 SDK 完成。
          // AMap.plugin(["AMap.Geocoder"]),function(){
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
            city: ""
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.mapInfo.address = result.regeocode.formattedAddress;
                self.$emit("listenToMap", self.mapInfo);
                self.$nextTick();
              }
            }
          });

          // }
        }
      },
      lng: 0,
      lat: 0
    };
  },
  methods: {
    onSearchResult(pois) {
      console.log(pois, "pois");
      var lng = pois[0].lng;
      var lat = pois[0].lat;
      this.lng = pois[0].lng;
      this.lat = pois[0].lat;
      this.center = [lng, lat];
      this.marker.position = [lng, lat];
      this.address = pois[0].name;
      this.mapInfo.lat = lat;
      this.mapInfo.lng = lng;
      this.mapInfo.address = pois[0].name;
      this.$emit("listenToMap", this.mapInfo);
    }
  }
};
</script>
