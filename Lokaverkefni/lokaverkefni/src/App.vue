<template>
  <div id="app">
    <h1 class="title is-2">Lokaverkefni Vefforritun</h1>
    <div id="newTaskHolder"> 

      <TaskField></TaskField>

    </div>

    <div id="newTasks">
      
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
import TaskField from "./Components/TaskField.vue"
export default {
  components: {TaskField},

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


    checkCompleted: function(event) {
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
  float:right;
}

#newTaskHolder {
   padding:10px;
}

#submitButton {
  margin-top:10px;
}

#newTasks {
  padding-bottom:25px;
}
</style>
