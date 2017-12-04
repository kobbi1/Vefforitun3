<template>
  <div id="app">
    <h1 class="title is-2">Lokaverkefni Vefforritun</h1>
    <div id="newTaskHolder">
      <input type="text" class="input" v-model="title" placeholder="Bæta við Hlut">

      <div id="submitButton">
        <button v-on:click="postTask" class="button is-link">Submit</button>
      </div>

    </div>

    <div v-for="list in lists" class="box is-primary">
      <h4 class="title name level-left" v-bind:class="{completedTask:list.completed}">Hvað á að gera: {{list.title}}</h4>
      <h2 class="subtitle company level-right" >Búið til: {{list.created}}</h2>

      <h5 class="subtitle is-6 level-right">Uppfært: {{list.updated}}</h5>
      <div id="myCheckbox" v-on:click="checkTask" >
        <label name="checkit">Completed</label>
        <input type="checkbox" id="checkBox" v-bind:value="list.id" name="checkit">
      </div>   
    </div>  
  </div>
</template>

<script>

import axios from "axios";

export default {

  data () {
    return {
      lists: [],
      completed: false,
      title: "",

    }
  },

  mounted() {
    var self = this;

    axios.get('http://fjolbraut.org/api/tasks', {
      params: {
        api_token: 'uhcuwuM1yyu8faO1QADPLToKPmHS9s4YcEtFGic7fDqEVhk5fWKCJED8Ovn5'
      }
    })
    
    .then(function(response) {
      self.lists = response.data
      console.log(response)

    })


    .catch(function(error) {
      console.log(error);
    });

    setTimeout(function() {
      self.checkCompleted()
    },100)
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

    checkCompleted: function() {
      var self = this;
      for(var x = 0; x < self.lists.length; x++) {
        var theTask = self.lists[x].completed
        var theCheck = document.getElementById("checkBox")
        theCheck.setAttribute("id","check"+x)

        if(theTask == true) {
          document.getElementById("check"+x).checked = true;
        } else{
          document.getElementById("check"+x).checked = false;
        }
      }
    },

    makeTempElement: function() {
      var mainDiv = document.createElement("div")

      var h4 = document.createElement("h4")
      h4.setAttribute("class","title name level-left")
      h4.text = this.title
      var h2 = document.createElement("h2")
      h2.setAttribute("class", "subtitle company level-right")
      h2.text = "Búið til: 1 sekúnda síðan"
      var h5 = document.createElement("h5")
      h5.setAttribute("class","subtitle is-6 level-right")
      h5.text ="Uppfært: 1 sekúnda síðan"
      var div = document.createElement("div")
      var label = document.createElement("label")
      var input = document.createElement("input")
      div.setAttribute("id","myCheckbox")
      label.setAttribute("name","checkit")
      input.setAttribute("type","checkbox")
      input.setAttribute("id","checkBox")
      input.setAttribute("name","checkit")
      div.appendChild(label)
      div.appendChild(input)

      mainDiv.appendChild(h4)
      mainDiv.appendChild(h2)
      mainDiv.appendChild(h5)
      mainDiv.appendChild(div)
      document.body.appendChild(mainDiv)

    }
  }

  

}
</script>

<style lang="scss">

body {
  text-align:center;
  padding:20px;
}

.input {
  text-align:center
}
.completedTask {
  text-decoration: line-through;
}

#myCheckbox {
  width:10%;
}

#newTaskHolder {
   padding:10px;
}

#submitButton {
  margin-top:10px;
}
</style>
