import css from './slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationDataLoading, selectApplicationSlider } from 'entities/application';

export const Slider = () => {
	const loading = useAppSelector(selectApplicationDataLoading);
	const slider = useAppSelector(selectApplicationSlider);

	const handleSlideChange = (swiper: SwiperType) => {
		const currentSlide = swiper.slides[swiper.activeIndex];
		const item = slider[swiper.activeIndex];
		const duration = (item?.duration || 3) * 1000;

		if (swiper.autoplay && typeof swiper.params.autoplay === 'object') {
			swiper.autoplay.stop();
			swiper.params.autoplay.delay = duration;
			swiper.autoplay.start();
		}

		const video = currentSlide.querySelector('video');

		if (video) {
			video.play();
			swiper.autoplay.stop();

			video.onended = () => {
				swiper.slideNext();
				swiper.autoplay.start();
			};
		}
	};

	if (loading || !slider.length) {
		return <div>Loading...</div>;
	}

	return (
		<Swiper
			className={css['slider']}
			onSlideChange={handleSlideChange}
			slidesPerView={1}
			modules={[Autoplay, EffectFade]}
			effect="fade"
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
		>
			{slider?.map((item, i) => (
				<SwiperSlide className={css['slide']} key={item.url}>
					{item.type === 'video' ? (
						<video src={item.url} muted loop={false} />
					) : (
						<img src={item.url.replace('http://localhost', 'https://stand.webishost.ru')} alt="slide" />
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
};
