"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Store Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      review: "IMS transformed how we manage inventory. It’s intuitive, saves us hours every week, and has streamlined our entire process from stock entry to sales tracking. Couldn’t imagine running the store without it!",
      rating: 5,
    },
    {
      name: "Michael Lee",
      role: "Warehouse Supervisor",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
      review: "Real-time tracking and reporting have made my job so much easier. The insights we get help us stay ahead of stock shortages, and the interface is simple enough for my whole team to use effectively.",
      rating: 4,
    },
    {
      name: "Emily Carter",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1887&auto=format&fit=crop",
      review: "The automation features are a game-changer. IMS keeps everything organized effortlessly, from reordering supplies to managing supplier relationships, making my small business run like a well-oiled machine.",
      rating: 5,
    },
    {
      name: "David Patel",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      review: "IMS brought clarity to our chaotic inventory system. The ability to generate detailed reports and automate reordering has boosted our efficiency and cut costs significantly. It’s a must-have tool!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          What Our Users Say
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Trusted by businesses of all sizes
        </p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-md h-76 md:h-64 flex flex-col max-w-sm mx-auto">
                <div className="flex items-center mb-4">
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Name, Role, Stars */}
                  <div className="ml-4 w-full max-w-[calc(100%-5rem)] flex flex-col text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 text-base flex-grow">
                  “{testimonial.review}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="swiper-button-prev-custom bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}