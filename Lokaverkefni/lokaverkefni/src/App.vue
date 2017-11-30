<template>
  <div id="app">

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
        <input type="checkbox" id="checkBox" v-bind:value="list.id">
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
            console.log(response);

         })
         .catch(function(error) {
            console.log(error);
         });

      },

    checkCompleted: function() {
      var self = this
      for(var x = 0; self.lists.length; x++) {
        var theTask = self.lists[x].completed
        console.log(theTask)
        if(self.lists[x].completed == true) {
          console.log("This is true");
          document.getElementById("checkBox").checked === true;
        } else{
          console.log("This is false");
          document.getElementById("checkBox").checked === false;
        }
      }
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
  width:5%;
  cursor:pointer;
}

#newTaskHolder {
   padding:10px;
}

#submitButton {
  margin-top:10px;
}
</style>
