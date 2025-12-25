import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Bed, IndianRupee } from 'lucide-react';

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
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.2)';

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
      className="w-full max-w-md cursor-pointer overflow-hidden border-2 hover:border-[#C4A962] transition-colors"
      onClick={() => onClick(room)}
    >
      <div className="relative overflow-hidden">
        <img
          ref={imageRef}
          src={room.image}
          alt={room.name}
          className="aspect-4/3 w-full object-cover"
          width={500}
          height={375}
        />
        {room.badge && (
          <Badge className="absolute top-4 right-4 bg-[#C4A962] hover:bg-[#B39952] text-white">
            {room.badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        <h3 className="text-2xl font-bold playfair-display text-gray-900">{room.name}</h3>

        <p className="text-sm text-gray-600 raleway line-clamp-2">
          {room.description}
        </p>

        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{room.beds}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-[#C4A962]" />
            <span className="text-2xl font-bold text-[#C4A962] playfair-display">
              {room.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500">/night</span>
          </div>

          <Button
            className="bg-[#C4A962] hover:bg-[#B39952] text-white"
            size="sm"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard3D;
