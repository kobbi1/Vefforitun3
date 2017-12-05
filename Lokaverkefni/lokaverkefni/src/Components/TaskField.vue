<template>
	<div>

		<input type="text" class="input" v-model="title" placeholder="Bæta við Hlut">

 		<div id="submitButton">
    		<button v-on:click="postTask" class="button is-link">Submit</button>
  		</div>

	</div>
</template>

<script>

import axios from "axios"
export default {
  name: 'TaskField',
  data () {
    return {
      title: "",
    }
  },
methods: {
    checkTask: function(event) {

        var id = event.path[0].value;
        axios.post('http://fjolbraut.org/api/tasks/' + id + '/status?api_token=uhcuwuM1yyu8faO1QADPLToKPmHS9s4YcEtFGic7fDqEVhk5fWKCJED8Ovn5')
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
         });
      },

    postTask: function() {
       axios.post('http://fjolbraut.org/api/tasks?api_token=uhcuwuM1yyu8faO1QADPLToKPmHS9s4YcEtFGic7fDqEVhk5fWKCJED8Ovn5', {
            title: this.title
         })
         .then(function(response) {


         })
         .catch(function(error) {
            console.log(error);
         });

        var self = this
        setTimeout(function() {
          self.makeTempElement()
        },200)

      },

    makeTempElement: function() {
      var mainDiv = document.createElement("div")
      mainDiv.setAttribute("class","box is-primary")
      
      var h4 = document.createElement("h4")
      h4.setAttribute("class","title name level-left")
      h4.innerHTML = "Hvað á að gera: " + this.title
      var h2 = document.createElement("h2")
      h2.setAttribute("class", "subtitle company level-right")
      h2.innerHTML = "Búið til: 1 sekúnda síðan"
      var h5 = document.createElement("h5")
      h5.setAttribute("class","subtitle is-6 level-right")
      h5.innerHTML ="Uppfært: 1 sekúnda síðan"
      var div = document.createElement("div")
      var input = document.createElement("input")
      div.setAttribute("id","myCheckbox")
      
      input.setAttribute("type","checkbox")
      input.setAttribute("id","checkBox")
      input.setAttribute("name","checkit")
      div.appendChild(input)

      mainDiv.appendChild(h4)
      mainDiv.appendChild(h2)
      mainDiv.appendChild(h5)
      mainDiv.appendChild(div)
      var newTasks = document.getElementById("newTasks")
      newTasks.insertBefore(mainDiv, newTasks.childNodes[0])

    }
    }
}
</script>


<style>
	
</style>