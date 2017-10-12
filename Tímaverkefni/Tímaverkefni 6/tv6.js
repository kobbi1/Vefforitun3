	Vue.component("my-modal", {
		props:["title","paragraph"],
		template: `

	<div class="modal" id="modal">
  		<div v-on:click="hideModal" class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<article class="media">
					<div class="media-content">
						<p>
							<strong>{{title}}</strong>
							<br>
							{{paragraph}}
						</p>
					</div>
				</article>
			</div>
    	<!-- Any other Bulma elements you want -->
  		</div>
  
  		<button class="modal-close is-large" aria-label="close" v-on:click="hideModal"></button>
	</div>


		`,
		methods: {
			hideModal: function() {
				var modalClasses = document.getElementById("modal").classList
				modalClasses.remove("is-active")
			}
		}
	})


	var app = new Vue({
		el: "#app",
		methods: {
			showModal: function() {
				var modalClasses = document.getElementById("modal").classList
				console.log(modalClasses)
				modalClasses.add("is-active")
				
			},
		},
	})