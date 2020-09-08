<template>
	<AuthLayout title="Регистрация">
		<form class="form" @submit.prevent="submitHandler">
			<FormGroup title="Email">
				<InputGroup>
					<input v-model="email" type="email" class="form-control" />
				</InputGroup>
			</FormGroup>
			<FormGroup title="Имя">
				<InputGroup>
					<input v-model="fullname" type="text" class="form-control" />
				</InputGroup>
			</FormGroup>
			<FormGroup title="Пароль">
				<InputGroup>
					<input v-model="password" type="password" class="form-control" />
				</InputGroup>
			</FormGroup>
			<FormGroup title="Повтор пароля">
				<InputGroup>
					<input v-model="passwordRepeat" type="password" class="form-control" />
				</InputGroup>
			</FormGroup>
			<FormGroup>
				<AppCheckbox v-model="agree">Я согласен с условиями</AppCheckbox>
			</FormGroup>
			<FormButtons>
				<PrimaryButton type="submit">Зарегистрироваться</PrimaryButton>
			</FormButtons>
			<FormAppend>
				Уже есть аккаунт?
				<LinkButton tag="router-link" :to="{ name: 'login' }">
					Войдите
				</LinkButton>
			</FormAppend>
		</form>
	</AuthLayout>
</template>

<script>
import FormGroup from '@/components/UI/FormGroup.vue';
import FormButtons from '@/components/UI/FormButtons.vue';
import FormAppend from '@/components/UI/FormAppend.vue';
import InputGroup from '@/components/UI/InputGroup.vue';
import AppCheckbox from '@/components/UI/AppCheckbox.vue';
import AuthLayout from '@/components/layout/AuthLayout.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import LinkButton from '@/components/buttons/LinkButton.vue';

export default {
	name: 'RegisterPage',

	data: () => ({
		email: '',
		fullname: '',
		password: '',
		passwordRepeat: '',
		agree: false,
		errorMessage: ''
	}),

	methods: {
		validate() {
			if (this.email.length === 0) {
				this.errorMessage = 'Требуется ввести Email';
				return false;
			}

			if (this.fullname.length === 0) {
				this.errorMessage = 'Требуется ввести полное имя';
				return false;
			}

			if (this.password.length === 0) {
				this.errorMessage = 'Требуется ввести пароль';
				return false;
			}

			if (this.passwordRepeat.length === 0) {
				this.errorMessage = 'Требуется повторить пароль';
				return false;
			}

			if (this.password !== this.passwordRepeat) {
				this.errorMessage = 'Пароли не совпадают';
				return false;
			}

			if (!this.agree) {
				this.errorMessage = 'Требуется согласиться с условиями';
				return false;
			}

			return true;
		},
		async submitHandler() {
			try {
				if (!this.validate()) {
					throw new Error(this.errorMessage);
				}

				/* const response = await register(this.email, this.fullname, this.password);
				alert(response.id || response.message); */
			} catch (error) {
				/* alert(error.message); */
			}
		}
	},

	components: {
		AuthLayout,
		PrimaryButton,
		FormGroup,
		InputGroup,
		AppCheckbox,
		LinkButton,
		FormButtons,
		FormAppend
	}
};
</script>

<style scoped>
.form {
	margin: 0;
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

.input-group .form-control {
	width: 100%;
}
</style>
