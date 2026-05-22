
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export default function UniversityGallery({ facilities, isRTL }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const allImages = facilities.flatMap(f => f.images.map(img => ({
    url: img,
    title: isRTL ? f.name.ar : f.name.en
  })));

  if (!allImages.length) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">
        {isRTL ? 'معرض الصور والمرافق' : 'Gallery & Facilities'}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allImages.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-muted"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm">{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          {selectedImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[80vh] object-contain bg-black/90"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg font-medium">{selectedImage.title}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
