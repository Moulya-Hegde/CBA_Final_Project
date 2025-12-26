import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Bed, IndianRupee, ArrowRight } from 'lucide-react';

const RoomCard3D = ({ room, onClick }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const animationFrameRef = useRef(undefined);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    let rect;
    let centerX;
    let centerY;

    const updateCardTransform = (mouseX, mouseY) => {
      if (!rect) {
        rect = card.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const relativeX = mouseX - centerX;
      const relativeY = mouseY - centerY;

      const cardTransform = {
        rotateX: -relativeY * 0.035,
        rotateY: relativeX * 0.035,
        scale: 1.025
      };

      const imageTransform = {
        rotateX: -relativeY * 0.025,
        rotateY: relativeX * 0.025,
        scale: 1.05
      };

      return { cardTransform, imageTransform };
    };

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      );

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`;
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';

      image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      image.style.transition = 'transform 0.2s ease';
      animate();
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = 'none';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';

      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      image.style.transition = 'transform 0.5s ease';
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-md cursor-pointer overflow-hidden border border-gray-200 hover:border-black transition-all duration-500 rounded-xl bg-white group/card"
      onClick={() => onClick(room)}
    >
      {/* Flush Image Container */}
      <div className="relative w-full overflow-hidden aspect-4/3">
        <img
          ref={imageRef}
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover block"
        />
        
        {/* Minimal City Badge */}
        {room.cityName && (
          <div className="absolute top-0 left-0 z-10 bg-black/80 backdrop-blur-md text-white px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-bold rounded-br-xl">
            {room.cityName}
          </div>
        )}

        {/* Minimal Status Badge */}
        {room.badge && (
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[9px] tracking-widest uppercase font-bold border border-black/10">
            {room.badge}
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-5">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold playfair-display text-gray-900 leading-tight">
            {room.name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">
             {room.hotelName}
          </p>
        </div>

        <p className="text-sm text-gray-500 raleway line-clamp-2 leading-relaxed">
          {room.description}
        </p>

        {/* Specs with subtle icons */}
        <div className="flex gap-6 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gray-900" />
            <span>{room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-3.5 h-3.5 text-gray-900" />
            <span>{room.beds}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-gray-400">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 playfair-display">
                ₹{room.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">/ Night</span>
            </div>
          </div>

          <Button
            className="rounded-none bg-black hover:bg-gray-800 text-white px-6 h-10 transition-all duration-300 group/btn"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Details</span>
            <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard3D;