
import React from 'react';

export default function FacilityCard({ facility, isRTL }) {
  const name = isRTL ? facility.name.ar : facility.name.en;
  const description = isRTL ? facility.description.ar : facility.description.en;
  const mainImage = facility.images[0];

  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted shadow-sm">
      <img 
        src={mainImage} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
