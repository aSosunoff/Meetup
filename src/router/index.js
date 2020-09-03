import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import FormPage from '../views/FormPage.vue';
import MeetupsPage from '../views/MeetupsPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'main',
		component: MeetupsPage
	},
	{
		path: '/meetups',
		name: 'meetups',
		component: MeetupsPage
	},
	{
		path: '/login',
		name: 'login',
		component: LoginPage
	},
	{
		path: '/form',
		name: 'form',
		component: FormPage
	},
	{
		path: '*',
		component: NotFoundPage
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
