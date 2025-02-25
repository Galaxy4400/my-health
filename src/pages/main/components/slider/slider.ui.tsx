import css from './slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import slide1 from 'shared/assets/img/swiper/slide1.jpg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useFetch } from 'shared/hooks';

const slides = [
	{
		url: slide1,
	},
	{
		url: 'https://tickets.dkmir-dubna.ru/images/data/adv/0_adv_1737541931.mp4',
	},
];

export const Slider = () => {
	const { data, loading } = useFetch('mock', slides);

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleSlideChange = (swiper: SwiperType) => {
		const currentSlide = swiper.slides[swiper.activeIndex];

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
			loop={true}
		>
			{data?.map((item, i) => (
				<SwiperSlide className={css['slide']} key={i}>
					{item.url.trim().endsWith('.mp4') ? (
						<video src={item.url} muted loop={false} />
					) : (
						<img src={item.url} alt="slide" />
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
};
