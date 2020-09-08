import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
	if (to.meta && to.meta.saveScrollPosition && from.meta && from.meta.saveScrollPosition) {
		return false;
	}

	if (savedPosition) {
		return savedPosition;
	}

	if (to.hash) {
		return {
			selector: to.hash,
			offset: { x: 0, y: 10 }
		};
	}

	return { x: 0, y: 0 };
}

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/LoginPage.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/RegisterPage.vue')
	},
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/PageWithQuery.vue')
	},
	{
		path: '/meetups',
		name: 'meetups',
		component: () => import('@/views/PageWithQuery.vue')
	},
	{
		path: '/meetups/create',
		name: 'create',
		component: () => import('@/views/CreatePage.vue')
	},
	{
		path: '/meetups/:meetupId(\\d+)/edit',
		name: 'edit',
		component: () => import('@/views/EditPage.vue'),
		props: {
			title: 'Редактирование митапа',
			submitText: 'Редактировать'
		}
	},
	{
		path: '/meetups/:meetupId(\\d+)',
		name: 'meetup',
		redirect: to => ({ name: 'meetup-description', params: to.params }),
		meta: {
			showReturnToMeetups: true,
			saveScrollPosition: true
		},
		component: () => import('@/views/MeetupPage'),
		children: [
			{
				path: 'description',
				name: 'meetup-description',
				props: true,
				component: () => import('@/views/MeetupDescriptionPage.vue')
			},
			{
				path: 'agenda',
				name: 'meetup-agenda',
				props: true,
				component: () => import('@/views/MeetupAgendaPage.vue')
			}
		]
	},
	{
		path: '*',
		component: () => import('@/views/NotFoundPage.vue')
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior,
	routes
});

export default router;
