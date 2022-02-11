<template>
  <ion-page>
    <ion-header>
		<ion-text style="text-align: center;">
			<h1>Track my Pantry</h1>
		</ion-text>
    </ion-header>

    <ion-content :fullscreen="true">
		<ion-header collapse="condense">
			<ion-toolbar>
				<ion-title size="large">login</ion-title>
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

			<ion-item-divider></ion-item-divider>

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
			<ion-input placeholder="enter username" enterkeyhint="submit" v-model="emailregister" required></ion-input>
			<ion-text>
				<h2>Password:</h2>
			</ion-text>
			<ion-input type="password" placeholder="enter password" enterkeyhint="submit" v-model="passwordregister" required></ion-input>

			<ion-item-divider></ion-item-divider>

			<ion-button size="medium" color="secondary" @click="register">Register</ion-button>
			<ion-button size="medium" color="danger" @click="registerForm = false">Login</ion-button>
		</div>
      
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonContent, IonButton, IonText, IonInput, IonItemDivider, toastController } from '@ionic/vue';
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent ({
	name: "startingpage",
	components: { IonHeader, IonContent, IonPage, IonButton, IonText, IonInput, IonItemDivider },
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
		register() {
			const registerform = { username: this.usernameregister, email: this.emailregister, password: this.passwordregister }
			axios.post(this.$store.state.projectEndPoint + "users", registerform).then((result) => {
				//this.$router.push('/')
				this.registerForm = false;
				this.openSuccessToast();
			})
			.catch(error => {
				console.log(error)
				this.openFailedToast();
      })
		},

		login() {
			const loginform = { email: this.emaillogin, password: this.passwordlogin }
			axios.post(this.$store.state.projectEndPoint + "auth/login", loginform).then((result) => {
				this.$router.push('/tabs/tab1')
				console.log(result.data.accessToken)
				const init = new String("Bearer ")
				this.$store.state.token = init + result.data.accessToken
				//console.log(this.token)
				//this.$store.mutations.updataa(this.$store.state.token, result.data.accessToken)
			})
			.catch(error => {
				this.openUnsuccessLoginToast();
      })
		},

		async openSuccessToast() {
      const toast = await toastController
        .create({
          message: 'User successfully created!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

		async openFailedToast() {
      const toast = await toastController
        .create({
          message: 'Error, user already exist!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

		async openUnsuccessLoginToast() {
      const toast = await toastController
        .create({
          message: 'Incorrect username or password!',
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
		top: 20%;
	}

	.register {
		border: 2px solid white;
		border-radius: 10px;
		padding: 30px;
		margin: 30px;
		text-align: center;
		position: relative;
		top: 15%;
	}
</style>