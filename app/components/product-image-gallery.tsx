"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImageGallery({ images, productName, placeholder }: { images: string[]; productName: string; placeholder: string }) {
  const [selected, setSelected] = useState(0);
  const selectedImage = images[selected];

  return <div className="product-gallery">
    <div className="gallery-main">
      {selectedImage ? <Image className="gallery-image" src={selectedImage} alt={productName} width={560} height={560} priority /> : <div className="gallery-placeholder" role="img" aria-label={`${productName}: image not available`}><span aria-hidden="true">{placeholder}</span><small>Image not available</small></div>}
    </div>
    {images.length > 1 && <div className="gallery-thumbnails" aria-label={`${productName} images`}>{images.map((image, index) => <button key={image} type="button" className={selected === index ? "selected" : ""} aria-label={`Show product image ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><Image src={image} alt="" width={64} height={64} /></button>)}</div>}
  </div>;
}
