import alertCircle from '@/assets/icons/icon-alert-circle.svg';
import calSm from '@/assets/icons/icon-cal-sm.svg';
import calLg from '@/assets/icons/icon-cal-lg.svg';
import check from '@/assets/icons/icon-check.svg';
import checkCircle from '@/assets/icons/icon-check-circle.svg';
import chevronDown from '@/assets/icons/icon-chevron-down.svg';
import clock from '@/assets/icons/icon-clock.svg';
import coffee from '@/assets/icons/icon-coffee.svg';
import key from '@/assets/icons/icon-key.svg';
import list from '@/assets/icons/icon-list.svg';
import map from '@/assets/icons/icon-map.svg';
import penTool from '@/assets/icons/icon-pen-tool.svg';
import pillActive from '@/assets/icons/icon-pill-active.svg';
import search from '@/assets/icons/icon-search.svg';
import trash from '@/assets/icons/icon-trash.svg';
import tv from '@/assets/icons/icon-tv.svg';
import user from '@/assets/icons/icon-user.svg';

import fetchJson from '@/utils/fetch-json';

export const iconMap = {
	'alert-circle': alertCircle,
	'cal-sm': calSm,
	'cal-lg': calLg,
	check,
	'check-circle': checkCircle,
	'chevron-down': chevronDown,
	clock,
	coffee,
	key,
	list,
	map,
	'pen-tool': penTool,
	'pill-active': pillActive,
	search,
	trash,
	tv,
	user
};

// eslint-disable-next-line import/prefer-default-export
export const ImageService = {
	/**
	 * Загружает файл на сервер и получает
	 * https://course-vue.javascript.ru/api/#/Images/ImagesController_uploadImage
	 * @param {File} file - файл, который требуется загрузить
	 * @return {Promise<Object>} - объект с ID изображения
	 */
	// eslint-disable-next-line no-unused-vars
	uploadImage(/* file */) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({ id: 1 });
			}, 500);
		});
	},

	/**
	 * Возвращает ссылку на изображение по ID
	 * @param id - ID изображения
	 * @return {string} - ссылка на изображение
	 */
	getImageURL(id) {
		return id !== null ? `${process.env.VUE_APP_API_URL}/images/${id}` : null;
	}
};

export const MeetupServise = {
	async getMeetupById(id) {
		const meetup = await fetchJson(`${process.env.VUE_APP_API_URL}/meetups/${id}`);
		return meetup;
	},
	async getMeetups() {
		const meetups = await fetchJson(`${process.env.VUE_APP_API_URL}/meetups`);
		return meetups;
	}
};

export const statusLoadImage = {
	load: 'Загрузить изображение',
	expect: 'Загрузка...',
	success: 'Удалить изображение'
};

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
export const agendaItemTitles = {
	registration: 'Регистрация',
	opening: 'Открытие',
	break: 'Перерыв',
	coffee: 'Coffee Break',
	closing: 'Закрытие',
	afterparty: 'Afterparty',
	talk: 'Доклад',
	other: 'Другое'
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
	registration: key,
	opening: calSm,
	talk: tv,
	break: clock,
	coffee,
	closing: key,
	afterparty: calSm,
	other: calSm
};

export const agendaItemTypes = [
	{ value: 'registration', text: 'Регистрация' },
	{ value: 'opening', text: 'Открытие' },
	{ value: 'break', text: 'Перерыв' },
	{ value: 'coffee', text: 'Coffee Break' },
	{ value: 'closing', text: 'Закрытие' },
	{ value: 'afterparty', text: 'Afterparty' },
	{ value: 'talk', text: 'Доклад' },
	{ value: 'other', text: 'Другое' }
];

export const agendaItemLanguages = [
	{ value: null, text: 'Не указано' },
	{ value: 'RU', text: 'RU' },
	{ value: 'EN', text: 'EN' }
];

export const getTimestamp = time => {
	const [hours, minuts] = time.split(':');
	return new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		hours,
		minuts
	).getTime();
};

export const agendaIconMap = {
	registration: 'key',
	opening: 'cal-sm',
	talk: 'tv',
	break: 'clock',
	coffee: 'coffee',
	closing: 'key',
	afterparty: 'cal-sm',
	other: 'cal-sm'
};
