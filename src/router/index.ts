import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BusScheduleView from '@/views/BusScheduleView.vue';
import BusStopsView from '@/views/BusStopsView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: BusScheduleView,
	},
	{
		path: '/stops',
		component: BusStopsView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
