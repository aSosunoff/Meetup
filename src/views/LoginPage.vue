<template>
	<auth-layout title="Вход">
		<form class="form" @submit.prevent="submitHandler">
			<div class="form-group">
				<label class="form-label">Email</label>
				<div class="input-group">
					<input
						v-model="email"
						type="email"
						placeholder="demo@email"
						class="form-control"
					/>
				</div>
			</div>
			<div class="form-group">
				<label class="form-label">Пароль</label>
				<div class="input-group">
					<input
						v-model="password"
						type="password"
						placeholder="password"
						class="form-control"
					/>
				</div>
			</div>
			<div class="form__buttons">
				<PrimaryButton type="submit">Войти</PrimaryButton>
			</div>
			<div class="form__append">
				Нет аккаунта?
				<router-link :to="{ name: 'register' }" class="link">Зарегистрируйтесь</router-link>
			</div>
		</form>
	</auth-layout>
</template>

<script>
import AuthLayout from '@/layout/AuthLayout.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

export default {
	name: 'LoginPage',

	data: () => ({
		email: '',
		password: '',
		errorMessage: ''
	}),

	methods: {
		validate() {
			this.errorMessage = '';
			if (this.email.length === 0) {
				this.errorMessage = 'Требуется ввести Email';
				return false;
			}

			if (this.password.length === 0) {
				this.errorMessage = 'Требуется ввести пароль';
				return false;
			}

			return true;
		},
		async submitHandler() {
			try {
				if (!this.validate()) {
					throw new Error(this.errorMessage);
				}
				/* const response = await login(this.email, this.password);
				alert(response.fullname || response.message); */
			} catch (error) {
				/* alert(error.message); */
			}
		}
	},

	components: { AuthLayout, PrimaryButton }
};
</script>

<style scoped>
.form {
	margin: 0;
}

.form-group {
	position: relative;
	margin-bottom: 24px;
}

.form-label {
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	margin-bottom: 10px;
	display: block;
}

.form-control {
	padding: 12px 16px;
	height: 52px;
	border-radius: 8px;
	border: 2px solid var(--blue-light);
	font-family: 'Nunito', sans-serif;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	transition: 0.2s all;
	background-color: var(--white);
	outline: none;
	box-shadow: none;
}

.form-control::placeholder {
	font-weight: 400;
	color: var(--blue-2);
}

.form-control:focus {
	border-color: var(--blue);
}

.input-group.input-group_icon .form-control {
	padding-left: 50px;
}

.input-group {
	position: relative;
}

.input-group .form-control {
	width: 100%;
}

.form__buttons {
	display: flex;
	flex-direction: column;
	padding: 0 40px;
	margin-top: 40px;
}

.form__buttons .button + .button {
	margin-bottom: 8px;
}

.form__append {
	margin-top: 40px;
	text-align: center;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
}
</style>
