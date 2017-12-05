	Vue.component("newTaskField", {
		template: `
		      <input type="text" class="input" v-model="title" placeholder="Bæta við Hlut">

		      <div id="submitButton">
		        <button v-on:click="postTask" class="button is-link">Submit</button>
		      </div>

		`
	})


	var app = new Vue({
		el: "#app",
	})