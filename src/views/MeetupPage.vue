<template>
	<div class="bg-white">
		<MeetupCover :title="meetup.title" :link="link" />

		<div class="container">
			<div class="meetup">
				<div class="meetup__content">
					<ContentTabs :tabs="tabs">
						<router-view :meetup="meetup" />
					</ContentTabs>
				</div>
				<div class="meetup__aside">
					<MeetupInfo :meetup="meetup" />
					<div class="meetup__aside-buttons">
						<PrimaryButton :to="{ name: 'edit', props: meetup }" tag="router-link">
							Редактировать
						</PrimaryButton>
						<SecondaryButton>Отменить участие</SecondaryButton>
						<DangerButton>Удалить</DangerButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MeetupCover from '@/components/MeetupCover.vue';
import MeetupInfo from '@/components/MeetupInfo.vue';
import ContentTabs from '@/components/ContentTabs.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import DangerButton from '@/components/buttons/DangerButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import { MeetupServise, ImageService } from '@/utils/helpful';

export default {
	name: 'MeetupPage',

	data() {
		return {
			meetup: {},
			tabs: [
				{ to: { name: 'meetup-description' }, text: 'Описание' },
				{ to: { name: 'meetup-agenda' }, text: 'Программа' }
			]
		};
	},

	beforeRouteEnter(to, from, next) {
		MeetupServise.getMeetupById(to.params.meetupId).then(meetup => {
			next(vm => vm.setMeetup(meetup));
		});
	},

	beforeRouteUpdate(to, from, next) {
		if (to.params.meetupId === from.params.meetupId) {
			next();
		} else {
			MeetupServise.getMeetupById(to.params.meetupId).then(meetup => {
				this.setMeetup(meetup);
				next();
			});
		}
	},

	methods: {
		setMeetup(meetup) {
			this.meetup = {
				...meetup,
				date: new Date(meetup.date)
			};
		}
	},

	computed: {
		link() {
			return this.meetup.imageId
				? `url(${ImageService.getImageURL(this.meetup.imageId)})`
				: '';
		}
	},

	components: {
		MeetupCover,
		MeetupInfo,
		ContentTabs,
		DangerButton,
		PrimaryButton,
		SecondaryButton
	}
};
</script>

<style scoped>
.bg-white {
	background-color: var(--white);
}

.meetup {
	display: flex;
	flex-direction: column;
	margin: 48px 0 0;
	padding-bottom: 48px;
}

.meetup__content p {
	margin-bottom: 24px;
	font-size: 18px;
	line-height: 28px;
	white-space: pre-wrap;
}

.meetup__aside {
	margin: 40px 0;
}

.meetup__aside-buttons {
	padding: 0 0 0 34px;
	margin-top: 16px;
}

.meetup__aside-buttons > .button {
	margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
	.meetup {
		flex-direction: row;
	}

	.meetup__content {
		flex: 1 0 calc(100% - 350px);
	}

	.meetup__aside {
		flex: 1 0 350px;
		padding: 50px 0 0 44px;
		margin: 0;
	}
}
</style>
