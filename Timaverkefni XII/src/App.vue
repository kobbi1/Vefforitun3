<template>
  <div id="app">

    <div>
      <input type="radio" name="rButton" value="Allt" id="allt" v-on:click="companyName='allt'" checked="checked">
      <label for="allt">Allt</label>

      <input type="radio" name="rButton" id="atlantsolia" v-on:click="companyName='Atlantsolía'">
      <label for="atlantsolia">Atlantsolía</label>

      <input type="radio" name="rButton" id="costcoIceland" v-on:click="companyName='Costco Iceland'">
      <label for="costcoIceland">Costco Iceland</label>

      <input type="radio" name="rButton" id="daelan"v-on:click="companyName='Dælan'">
      <label for="daelan">Dælan</label>

      <input type="radio" name="rButton" id="n1"v-on:click="companyName='N1'">
      <label for="n1">N1</label>

      <input type="radio" name="rButton" id="olis"v-on:click="companyName='Olís'">
      <label for="olis">Olís</label>

      <input type="radio" name="rButton" id="orkan"v-on:click="companyName='Orkan'">
      <label for="orkan">Orkan</label>

      <input type="radio" name="rButton" id="orkanx"v-on:click="companyName='Orkan X'">
      <label for="orkanx">Orkan X</label>

      <input type="radio" name="rButton" id="ob"v-on:click="companyName='ÓB'">
      <label for="ob">ÓB</label>

      <input type="radio" name="rButton" id="skeljungur"v-on:click="companyName='Skeljungur'">
      <label for="skeljungur">Skeljungur</label>



    </div>
    <br>
    <div v-for="petrol in sortedPetrols" class="box is-primary">
      <h4 class="title name">{{petrol.company}}</h4>
      <h2 class="subtitle company">{{petrol.name}}</h2>
      
      <h5 class="subtitle is-6">Bensin: {{petrol.bensin95}}kr literinn</h5>
      <h5 class="subtitle is-6">Disel: {{petrol.diesel}}kr literinn</h5>     
    </div>

  </div>
</template>




<script>

import axios from "axios";

export default {


  data () {

    return {
      petrols: [],
      companyName: "allt",
      tempList: [],
    };

  },

  mounted() {
    var self = this;
    axios.get('http://apis.is/petrol')

      .then(function(response) {

        self.petrols = response.data.results

      })

      .catch(function(error) {
        console.log(error);
      })

  },

  computed: {
    sortedPetrols: function() {
      var self = this
      var sorted = this.petrols.sort(function(a,b) {
        return parseFloat(a.bensin95) - parseFloat(b.bensin95) 
      });


      sorted = sorted.filter(function(station) {
        if(self.companyName == "allt") {
          return station.company == station.company
        }else {
          return station.company == self.companyName
        }

      })

      return sorted

    }


  },

}

</script>

<style>


body {
  padding:20px;
  text-align:center;
}

.name {

}

.company {
  color:#A9A9A9;
}

.input {
  text-align:center;
}

</style>
