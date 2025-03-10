import css from './slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { useFetch } from 'shared/hooks';
import slide1 from 'shared/assets/img/swiper/pic1.jpg';
import slide2 from 'shared/assets/img/swiper/pic2.jpg';
import slide3 from 'shared/assets/img/swiper/video.mp4';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
	{
		url: slide1,
	},
	{
		url: slide2,
	},
	{
		url: slide3,
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
