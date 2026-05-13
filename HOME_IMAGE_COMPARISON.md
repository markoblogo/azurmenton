# Homepage Image Comparison

Compared current homepage image sources with AI-processed replacements from `/Users/antonbiletskiy-volokh/Desktop/home`. SVG wrappers were not served directly; their embedded PNG images were extracted losslessly into `public/images/home` and are rendered through `next/image`.

| Homepage use | Previous image | Previous pixels | Replacement image | Replacement pixels | MP ratio |
|---|---|---:|---|---:|---:|
| Hero primary | `public/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpeg` | 701 x 525 (0.37 MP, 81 KB) | `public/images/home/BeachfrontStudio-portret.png` | 864 x 1184 (1.02 MP, 2144 KB) | 2.78x |
| Hero supporting | `public/images/apartments/sea-view-balcony-studio/04-open-plan-studio-layout.jpeg` | 1024 x 525 (0.54 MP, 61 KB) | `public/images/home/hero2.png` | 1344 x 768 (1.03 MP, 1892 KB) | 1.92x |
| Card: Sea View Balcony Studio | `public/images/apartments/sea-view-balcony-studio/01-balcony-coffee-sea-view.jpeg` | 535 x 592 (0.32 MP, 107 KB) | `public/images/home/SeaViewBalconyStudio.png` | 864 x 1184 (1.02 MP, 2541 KB) | 3.23x |
| Card: Terrace & Parking Apartment | `public/images/apartments/beachside-family-apartment/01-private-terrace-breakfast.jpeg` | 1019 x 764 (0.78 MP, 196 KB) | `public/images/home/TerraceParkingApartment.png` | 1344 x 768 (1.03 MP, 2523 KB) | 1.33x |
| Card: Panoramic Sea View Studio | `public/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpeg` | 701 x 525 (0.37 MP, 81 KB) | `public/images/home/BeachfrontStudio-portret.png` | 864 x 1184 (1.02 MP, 2144 KB) | 2.78x |
| Guide image: old town | `public/images/apartments/beachside-family-apartment/17-menton-old-town.jpeg` | 548 x 739 (0.40 MP, 54 KB) | `public/images/home/Planyourstay1.png` | 864 x 1184 (1.02 MP, 1954 KB) | 2.53x |
| Guide image: beach | `public/images/apartments/beachside-family-apartment/14-nearby-beach.jpeg` | 540 x 708 (0.38 MP, 92 KB) | `public/images/home/Planyourstay2.png` | 864 x 1184 (1.02 MP, 2565 KB) | 2.68x |

## Summary

- All selected replacements have higher pixel dimensions than the previous homepage images.
- The replacements are used only on the homepage; apartment detail galleries and content photo mappings are unchanged.
- The AI-processed files were provided as SVG files containing embedded PNG images. The embedded PNGs were extracted without resizing or recompression so Next.js can serve optimized responsive variants.
