import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useRef } from 'react';

const BANNERS = [
  {
    id: 1,
    title: 'Fresh Groceries Delivered',
    subtitle: 'Save up to 30% on your first order',
    color: 'from-primary to-primary/70'
  },
  {
    id: 2,
    title: 'Quick Delivery in 15 Minutes',
    subtitle: 'Get your essentials delivered fast',
    color: 'from-secondary to-secondary/70'
  },
  {
    id: 3,
    title: 'Daily Essentials at Best Prices',
    subtitle: 'Quality products, unbeatable prices',
    color: 'from-primary/80 to-secondary/80'
  },
  {
    id: 4,
    title: 'Fresh Fruits & Vegetables',
    subtitle: 'Farm-fresh produce delivered daily',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 5,
    title: 'Dairy Products & More',
    subtitle: 'Premium quality dairy at your doorstep',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 6,
    title: 'Snacks & Beverages',
    subtitle: 'Stock up on your favorite treats',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 7,
    title: 'Special Weekend Offers',
    subtitle: 'Extra discounts on bulk orders',
    color: 'from-purple-500 to-purple-600'
  }
];

export function BannerCarousel() {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current?.scrollNext) {
        carouselRef.current.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      className="w-full"
    >
      <CarouselContent>
        {BANNERS.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className={`relative h-40 md:h-48 rounded-3xl bg-gradient-to-r ${banner.color} overflow-hidden`}>
              <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{banner.title}</h3>
                <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <img 
                  src="/assets/generated/qd-offer-banners.dim_1800x600.png" 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
