<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Track my pantry</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
		<ion-header collapse="condense">
			<ion-toolbar>
				<ion-title size="large">Track my pantry</ion-title>
			</ion-toolbar>
		</ion-header>

		<!-- LOGIN FORM -->
		<div class="login" v-if="registerForm == false">
			<h1 class="cardTitle">Login</h1>
			<ion-text>
				<h2>Email:</h2>
			</ion-text>
			<ion-input placeholder="enter username" enterkeyhint="submit" v-model="emaillogin" required></ion-input>
			<ion-text>
				<h2>Password:</h2>
			</ion-text>
			<ion-input type="password" placeholder="enter password" enterkeyhint="submit" v-model="passwordlogin" required></ion-input>

			<div style="height: 50px;"></div>

			<ion-button style="text-align: center;" size="medium" color="secondary" @click="login">Login</ion-button>
			<ion-button style="text-align: center;" size="medium" color="danger" @click="registerForm = true">Register</ion-button>
		</div>

		<!-- REGISTER FORM -->
		<div class="register" v-else>
			<h1 class="cardTitle">Register</h1>
			<ion-text>
				<h2>Username:</h2>
			</ion-text>
			<ion-input placeholder="enter username" enterkeyhint="submit" v-model="usernameregister" required></ion-input>
			<ion-text>
				<h2>Email:</h2>
			</ion-text>
			<ion-input placeholder="enter email" enterkeyhint="submit" v-model="emailregister" required></ion-input>
			<ion-text>
				<h2>Password:</h2>
			</ion-text>
			<ion-input type="password" placeholder="enter password" enterkeyhint="submit" v-model="passwordregister" required></ion-input>

			<div style="height: 50px;"></div>

			<ion-button size="medium" color="secondary" @click="register">Register</ion-button>
			<ion-button size="medium" color="danger" @click="registerForm = false">Login</ion-button>
		</div>
      
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonContent, IonButton, IonText, IonInput, toastController } from '@ionic/vue';
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent ({
	name: "startingpage",
	components: { IonHeader, IonContent, IonPage, IonButton, IonText, IonInput },
	data() {
		return {
			emaillogin: '',
			passwordlogin: '',
			usernameregister: '',
			emailregister: '',
			passwordregister: '',
			//init: 'Bearer ',
			projectEndpoint: "https://lam21.iot-prism-lab.cs.unibo.it/",
			registerForm: false
		};
	},
	methods: {
		/* REGISTER */
		register() {
			const registerform = { username: this.usernameregister, email: this.emailregister, password: this.passwordregister }
			axios.post(this.$store.state.projectEndPoint + "users", registerform).then((result) => {
				this.registerForm = false;
				this.openSuccessToast();
			})
			.catch(error => {
				console.log(error)
				this.openFailedToast(error);
      })
		},

		/* LOGIN */
		login() {
			const loginform = { email: this.emaillogin, password: this.passwordlogin }
			axios.post(this.$store.state.projectEndPoint + "auth/login", loginform).then((result) => {
				this.$router.push('/tabs/tab2')
				console.log(result.data.accessToken)
				const init = new String("Bearer ")
				this.$store.state.token = init + result.data.accessToken
				//this.$store.state.currentUser = this.emaillogin
				this.$store.commit('setUser', this.emaillogin);
				console.log(this.$store.state.currentUser)
			})
			.catch(error => {
				this.openUnsuccessLoginToast(error);
      })
		},

		/* TOASTS */
		async openSuccessToast() {
      const toast = await toastController
        .create({
          message: 'User successfully created!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

		async openFailedToast(error: string) {
      const toast = await toastController
        .create({
          message: error,
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

		async openUnsuccessLoginToast(error: string) {
      const toast = await toastController
        .create({
          message: error,
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },
	},
})
</script>

<style type="text/css">
	.cardTitle {
		margin-top: 0;
		margin-bottom: 50px;
	}

	.login {
		border: 2px solid white;
		border-radius: 10px;
		padding: 30px;
		margin: 30px;
		text-align: center;
		position: relative;
		top: 10%;
	}

	.register {
		border: 2px solid white;
		border-radius: 10px;
		padding: 30px;
		margin: 30px;
		text-align: center;
		position: relative;
		top: 5%;
	}
</style>