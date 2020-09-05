<template>
	<FormLayout title="Создать митап">
		<form class="form meetup-form" @submit.prevent="submit">
			<div class="meetup-form__content">
				<fieldset class="form-section">
					<div class="form-group">
						<label class="form-label">Название</label>
						<div class="input-group">
							<input class="form-control" v-model="meetupLocal.title" />
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Дата</label>
						<div class="input-group">
							<input
								class="form-control"
								type="date"
								:value="dateFormat"
								@input="meetupLocal.date = new Date($event.target.value)"
							/>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Место проведения</label>
						<div class="input-group">
							<input class="form-control" v-model="meetupLocal.place" />
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Описание</label>
						<div class="input-group">
							<textarea
								class="form-control"
								rows="3"
								v-model="meetupLocal.description"
							></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Изображение</label>
						<ImageUploader v-model="meetupLocal.imageId" />
					</div>
				</fieldset>

				<h3 class="form__section-title">Программа</h3>

				<MeetupAgendaItemForm
					class="mb-3"
					v-for="(agendaItem, inx) in meetupLocal.agenda"
					:key="agendaItem.id"
					:agendaItem="agendaItem"
					@update:agendaItem="meetupLocal.agenda.splice(inx, 1, $event)"
					@remove="meetupLocal.agenda.splice(inx, 1)"
				/>

				<div class="form-section_append">
					<button type="button" data-test="addAgendaItem" @click="addedAgendaItemHandler">
						+ Добавить этап программы
					</button>
				</div>
			</div>

			<div class="meetup-form__aside">
				<div class="meetup-form__aside_stick">
					<SecondaryButton
						type="button"
						data-test="cancel"
						@click="$emit('cancel')"
						block
					>
						Отмена
					</SecondaryButton>
					<PrimaryButton type="submit" data-test="submit" block>{{
						submitText
					}}</PrimaryButton>
				</div>
			</div>
		</form>
	</FormLayout>
</template>

<script>
import MeetupAgendaItemForm from '@/components/MeetupAgendaItemForm.vue';
import FormLayout from '@/layout/FormLayout.vue';
import ImageUploader from '@/components/ImageUploader.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import deepClone from 'lodash/cloneDeep';

function buildAgendaItem() {
	return {
		id: Math.random(),
		startsAt: '00:00',
		endsAt: '00:00',
		type: 'other',
		title: null,
		description: null,
		speaker: null,
		language: null
	};
}

export default {
	name: 'FormPage',

	data() {
		return {
			meetupLocal: {}
		};
	},

	props: {
		meetup: {
			required: true,
			type: Object
		},
		submitText: {
			type: String
		}
	},

	watch: {
		meetup: {
			immediate: true,
			handler(value) {
				console.log(deepClone(value));
				this.meetupLocal = deepClone(value);
			}
		}
	},

	methods: {
		submit() {
			this.$emit('submit', deepClone(this.meetupLocal));
		},
		addedAgendaItemHandler() {
			if (this.meetupLocal.agenda.length) {
				const lastElement = this.meetupLocal.agenda.slice(-1)[0];
				this.meetupLocal.agenda.push({
					...buildAgendaItem(),
					startsAt: lastElement.endsAt
				});
			} else {
				this.meetupLocal.agenda.push(buildAgendaItem());
			}
		}
	},

	computed: {
		dateFormat() {
			const year = this.meetupLocal.date.getFullYear();
			const month = `${this.meetupLocal.date.getMonth() + 1}`.padStart(2, '0');
			const day = `${this.meetupLocal.date.getDate()}`.padStart(2, '0');

			return `${year}-${month}-${day}`;
		}
	},

	components: { FormLayout, ImageUploader, MeetupAgendaItemForm, PrimaryButton, SecondaryButton }
};
</script>

<style scoped>
.input-group .form-control {
	width: 100%;
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

textarea.form-control {
	width: 100%;
	min-height: 211px;
}

.form__section-title {
	font-weight: 700;
	font-size: 28px;
	line-height: 150%;
	color: var(--body-color);
	margin: 0 0 24px 0;
}

.form-section {
	border: none;
	position: relative;
}

.form-section_append {
	margin-top: 24px;
}

.form-section_append button {
	box-shadow: none;
	border: none;
	background-color: transparent;
	padding: 0;
	outline: none;
	color: var(--blue);
	cursor: pointer;
	font-size: 20px;
	line-height: 28px;
}

.form-section_append button:hover {
	text-decoration: underline;
}

.meetup-form__aside {
	margin: 48px 0;
}

.meetup-form__aside_stick > .button {
	margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
	.meetup-form {
		display: flex;
		flex-direction: row;
	}

	.meetup-form__content {
		flex: 1 0 calc(100% - 320px);
	}

	.meetup-form__aside {
		flex: 1 0 320px;
		max-width: 320px;
		width: 100%;
		padding-left: 137px;
		margin: 0;
	}

	.meetup-form__aside_stick {
		position: sticky;
		top: 32px;
	}
}
</style>
