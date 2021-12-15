<template>
  <ion-page>
    <ion-header>
		<ion-text style="text-align: center;">
			<h1>Sign In</h1>
		</ion-text>
    </ion-header>

    <ion-content :fullscreen="true">
		<ion-header collapse="condense">
			<ion-toolbar>
				<ion-title size="large">login</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-text>
			<h2>Email:</h2>
		</ion-text>
		<ion-input placeholder="enter username" color="secondary" enterkeyhint="submit" v-model="emaillogin" required></ion-input>
		<ion-text>
			<h2>Password:</h2>
		</ion-text>
		<ion-input placeholder="enter password" color="secondary" enterkeyhint="submit" v-model="passwordlogin" required></ion-input>

		<ion-item-divider></ion-item-divider>

		<ion-button style="text-align: center;" size="medium" color="secondary" @click="login">Login</ion-button>

		<ion-text style="text-align: center;">
			<h1>Not registered yet?</h1>
		</ion-text>

		<ion-text>
			<h2>Username:</h2>
		</ion-text>
		<ion-input placeholder="enter username" color="danger" enterkeyhint="submit" v-model="usernameregister" required></ion-input>
		<ion-text>
			<h2>Email:</h2>
		</ion-text>
		<ion-input placeholder="enter username" color="danger" enterkeyhint="submit" v-model="emailregister" required></ion-input>
		<ion-text>
			<h2>Password:</h2>
		</ion-text>
		<ion-input placeholder="enter password" color="danger" enterkeyhint="submit" v-model="passwordregister" required></ion-input>

		<ion-item-divider></ion-item-divider>

		<ion-button size="medium" color="danger" @click="register">register</ion-button>

      
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonContent, IonButton, IonText, IonInput, IonItemDivider } from '@ionic/vue';
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
			token: '',
			projectEndpoint: "https://lam21.iot-prism-lab.cs.unibo.it/"
		};
	},
	methods: {
		register() {
			const registerform = { username: this.usernameregister, email: this.emailregister, password: this.passwordregister }
			axios.post(this.projectEndpoint + "users", registerform).then((result) => {
				this.$router.push('/tabs/tab1')
			})
			.catch(error => {
				console.log(error)
      })
		},

		login() {
			const loginform = { email: this.emaillogin, password: this.passwordlogin }
			axios.post(this.projectEndpoint + "auth/login", loginform).then((result) => {
				this.$router.push('/tabs/tab1')
				this.token = result.data
			})
			.catch(error => {
				console.log(error)
      })
		},
	},
})
</script>