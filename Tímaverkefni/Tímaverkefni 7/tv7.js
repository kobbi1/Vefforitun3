	Vue.component("card-component", {
		props:["mainimage","profilepic","title","username","paragraph"],
		template: `
			<div class="column is-one-third">
				<div class="card">
				  <div class="card-image">
				    <figure class="image is-4by3">
				      <img v-bind:src="mainimage" alt="Placeholder image">
				    </figure>
				  </div>
				  <div class="card-content">
				    <div class="media">
				      <div class="media-left">
				        <figure class="image is-48x48">
				          <img v-bind:src="profilepic" alt="Placeholder image">
				        </figure>
				      </div>
				      <div class="media-content">
				        <p class="title is-4">{{title}}</p>
				        <p class="subtitle is-6">{{username}}</p>
				      </div>
				    </div>

				    <div class="content">
				      {{paragraph}}
				      <br>
				      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
				    </div>
				  </div>
				</div>
			</div>
		`
	})


	var app = new Vue({
		el: "#app"
	})