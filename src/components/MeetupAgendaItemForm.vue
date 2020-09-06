<template>
	<div class="form-section form-section_inner">
		<button type="button" class="remove-button" @click="$emit('remove')">
			<img src="@/assets/icons/icon-trash.svg" alt="trash" />
		</button>

		<div class="form-group">
			<DropdownButton
				title="Тип"
				:options="agendaItemTypesList"
				:value="agendaItemLocal.type"
				@change="update({ ['type']: $event })"
			/>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form-group">
					<label class="form-label">Начало</label>
					<div class="input-group">
						<input
							class="form-control"
							type="time"
							:value="agendaItemLocal.startsAt"
							:placeholder="agendaItemLocal.startsAt"
							@input="changeStartTime($event.target.value)"
						/>
					</div>
				</div>
			</div>
			<div class="form__col">
				<div class="form-group">
					<label class="form-label">Окончание</label>
					<div class="input-group">
						<input
							class="form-control"
							type="time"
							:value="agendaItemLocal.endsAt"
							:placeholder="agendaItemLocal.endsAt"
							@input="update({ ['endsAt']: $event.target.value })"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group" v-if="fieldEnabled('title')">
			<label class="form-label">{{ titleName }}</label>
			<div class="input-group">
				<input
					class="form-control"
					:value="agendaItemLocal.title"
					@input="update({ ['title']: $event.target.value })"
				/>
			</div>
		</div>

		<div class="form-group" v-if="fieldEnabled('speaker')">
			<label class="form-label">Докладчик</label>
			<div class="input-group">
				<input
					class="form-control"
					:value="agendaItemLocal.speaker"
					@input="update({ ['speaker']: $event.target.value })"
				/>
			</div>
		</div>

		<div class="form-group" v-if="fieldEnabled('description')">
			<label class="form-label">Описание</label>
			<div class="input-group">
				<textarea
					class="form-control"
					:value="agendaItemLocal.description"
					@input="update({ ['description']: $event.target.value })"
				></textarea>
			</div>
		</div>

		<div class="form-group" v-if="fieldEnabled('language')">
			<DropdownButton
				title="Язык"
				:options="agendaItemLanguagesList"
				:value="agendaItemLocal.language"
				@change="update({ ['language']: $event })"
			/>
		</div>
	</div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton.vue';

import {
	agendaItemTypes,
	agendaItemLanguages,
	getUnicId,
	getTimestamp,
	agendaIconMap
} from '@/utils/helpful';

const getRange = (timeStart, timeEnd) => getTimestamp(timeEnd) - getTimestamp(timeStart);

const getTimeString = timestamp =>
	`${new Date(timestamp)
		.getHours()
		.toString()
		.padStart(2, '0')}:${new Date(timestamp)
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;

export default {
	name: 'MeetupAgendaItemForm',

	data() {
		return {
			agendaItemLocal: {}
		};
	},

	props: {
		agendaItem: {
			type: Object,
			required: true,
			default: () => ({})
		}
	},

	mounted() {},

	watch: {
		agendaItem: {
			immediate: true,
			handler(value) {
				this.agendaItemLocal = { ...value };
			}
		}
	},

	methods: {
		update(valueObject) {
			this.agendaItemLocal = {
				...this.agendaItemLocal,
				...valueObject
			};
			this.$emit('update:agendaItem', {
				...this.agendaItemLocal
			});
		},
		fieldEnabled(field) {
			return {
				registration: ['title'],
				opening: ['title'],
				break: ['title'],
				coffee: ['title'],
				closing: ['title'],
				afterparty: ['title'],
				talk: ['title', 'speaker', 'description', 'language'],
				other: ['title', 'description']
			}[this.agendaItemLocal.type].includes(field);
		},
		changeStartTime(startsAt) {
			this.update({
				startsAt,
				endsAt: getTimeString(
					getTimestamp(startsAt) +
						getRange(this.agendaItemLocal.startsAt, this.agendaItemLocal.endsAt)
				)
			});
		}
	},

	computed: {
		agendaItemLanguagesList() {
			return agendaItemLanguages.map(item => ({
				id: getUnicId(),
				...item
			}));
		},
		agendaItemTypesList() {
			return agendaItemTypes.map(item => ({
				id: getUnicId(),
				...item,
				icon: agendaIconMap[item.value]
			}));
		},
		titleName() {
			return {
				registration: 'Нестандартный текст (необязательно)',
				opening: 'Нестандартный текст (необязательно)',
				break: 'Нестандартный текст (необязательно)',
				coffee: 'Нестандартный текст (необязательно)',
				closing: 'Нестандартный текст (необязательно)',
				afterparty: 'Нестандартный текст (необязательно)',
				talk: 'Тема',
				other: 'Заголовок'
			}[this.agendaItemLocal.type];
		}
	},

	components: {
		DropdownButton
	}
};
</script>

<style scoped>
.form-group {
	position: relative;
	margin-bottom: 24px;
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

.form-section {
	border: none;
	position: relative;
}

.form-section + .form-section {
	margin-top: 24px;
}

.form-section.form-section_inner {
	padding: 20px 10% 0 16px;
	border: 2px solid var(--blue-light);
	border-radius: 8px;
}

.form-section_inner .remove-button {
	position: absolute;
	top: 4px;
	right: 0;
	box-shadow: none;
	border: none;
	background-color: transparent;
	outline: none;
	padding: 4px;
	cursor: pointer;
	transition: 0.2s all;
}

.form-section_inner .remove-button:hover {
	opacity: 0.6;
}

@media all and (min-width: 992px) {
	.form-section.form-section_inner {
		padding: 28px 25% 4px 24px;
	}

	.form-section_inner .remove-button {
		top: 20px;
		right: 20px;
	}
}

.form-label {
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	margin-bottom: 10px;
	display: block;
}

.form__row {
	display: flex;
	flex-direction: column;
}

.form__col + .form-col {
	margin-top: 16px;
}

.form__col:first-child {
	margin-left: 0;
}

@media all and (min-width: 992px) {
	.form-section.form-section_inner {
		padding: 28px 25% 4px 24px;
	}

	.form-section_inner .remove-button {
		top: 20px;
		right: 20px;
	}

	.form__row {
		flex-direction: row;
		justify-content: space-between;
		margin: 0 -12px;
	}

	.form__col {
		flex: 1 1 auto;
		padding: 0 12px;
		margin-top: 0;
	}

	.form__col:first-child {
		margin-left: 0;
	}
}

.input-group {
	position: relative;
}

.input-group .form-control {
	width: 100%;
}

.input-group.input-group_icon .form-control {
	padding-left: 50px;
}

.input-group.input-group_icon .icon {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon {
	left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon {
	right: 16px;
}

textarea.form-control {
	width: 100%;
	min-height: 211px;
}
</style>
