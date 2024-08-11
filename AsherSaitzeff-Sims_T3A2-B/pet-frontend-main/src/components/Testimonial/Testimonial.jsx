import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dog from '../../assets/images/dog.png';
const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO, Company A',
    imageUrl: dog,
    testimonial: 'This is an amazing product! Highly recommended.',
  },
  {
    name: 'Jane Smith',
    title: 'CTO, Company B',
    imageUrl: dog,
    testimonial: 'Fantastic experience! Will definitely use again.',
  },
  {
    name: 'Alice Johnson',
    title: 'Manager, Company C',
    imageUrl: dog,
    testimonial: 'Exceeded our expectations in every way.',
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 object-cover border-4"
              />
              <h3 className="text-[18px] font-semibold ">{testimonial.name}</h3>
              <p className="text-gray-500 button-font">{testimonial.title}</p>
              <p className="mt-4 text-gray-700 button-font">{testimonial.testimonial}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
