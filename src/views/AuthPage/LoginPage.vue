<template>
	<AuthLayout title="Вход">
		<form class="form" @submit.prevent="submitHandler">
			<FormGroup title="Email">
				<InputGroup>
					<input
						v-model="email"
						type="email"
						placeholder="demo@email"
						class="form-control"
					/>
				</InputGroup>
			</FormGroup>
			<FormGroup title="Пароль">
				<InputGroup>
					<input
						v-model="password"
						type="password"
						placeholder="password"
						class="form-control"
					/>
				</InputGroup>
			</FormGroup>
			<FormButtons>
				<PrimaryButton type="submit">Войти</PrimaryButton>
			</FormButtons>
			<FormAppend>
				Нет аккаунта?
				<LinkButton tag="router-link" :to="{ name: 'register' }">
					Зарегистрируйтесь
				</LinkButton>
			</FormAppend>
		</form>
	</AuthLayout>
</template>

<script>
import FormGroup from '@/components/UI/FormGroup.vue';
import FormButtons from '@/components/UI/FormButtons.vue';
import FormAppend from '@/components/UI/FormAppend.vue';
import LinkButton from '@/components/buttons/LinkButton.vue';
import InputGroup from '@/components/UI/InputGroup.vue';
import AuthLayout from '@/components/layout/AuthLayout.vue';
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

	components: {
		AuthLayout,
		PrimaryButton,
		FormGroup,
		InputGroup,
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
