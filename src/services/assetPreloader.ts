/**
 * Central Asset Preloader Service
 * Ensures all facilitator profile images, hero backgrounds, brand logos,
 * and event photos are loaded and decoded into memory cache at the initial opening of the site.
 */

import { FACILITATORS_DATA } from '../data/facilitatorsData';
import { BRAND_LOGO_URL, DIAMOND_STONES_PHOTOS, ALL_PHOTOS_GALLERY } from '../data/images';

// Global image instance pool to prevent garbage collection of decoded bitmaps
const preloadedImageElements: Map<string, HTMLImageElement> = new Map();
const preloadedUrls = new Set<string>();

// Extract all critical visual assets used across Diamond Stones platform
export const getAllSiteAssetUrls = (): string[] => {
  const urlSet = new Set<string>();

  // 1. Facilitator images (profile cards and hero background carousel)
  FACILITATORS_DATA.forEach((facilitator) => {
    if (facilitator.image) {
      urlSet.add(facilitator.image);
    }
  });

  // 2. Brand Logo
  if (BRAND_LOGO_URL) {
    urlSet.add(BRAND_LOGO_URL);
  }

  // 3. Editorial & Event gallery photos
  Object.values(DIAMOND_STONES_PHOTOS).forEach((photo) => {
    if (photo.url) {
      urlSet.add(photo.url);
    }
  });

  ALL_PHOTOS_GALLERY.forEach((photo) => {
    if (photo.url) {
      urlSet.add(photo.url);
    }
  });

  return Array.from(urlSet);
};

/**
 * Preload and decode a single image URL into browser cache
 */
export const preloadImage = (url: string, priority: 'high' | 'auto' | 'low' = 'auto'): Promise<void> => {
  if (!url || typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (preloadedUrls.has(url)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    try {
      const img = new Image();
      // Imgur compatibility and privacy
      img.referrerPolicy = 'no-referrer';
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';

      if ('fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = priority;
      }

      img.onload = () => {
        preloadedUrls.add(url);
        preloadedImageElements.set(url, img);
        // Pre-decode into GPU memory if browser supports it
        if ('decode' in img && typeof img.decode === 'function') {
          img.decode().catch(() => {
            // Ignore decode errors on non-critical decode
          }).finally(() => {
            resolve();
          });
        } else {
          resolve();
        }
      };

      img.onerror = () => {
        // If anonymous crossOrigin fails (some CDNs), retry without crossOrigin
        const fallbackImg = new Image();
        fallbackImg.referrerPolicy = 'no-referrer';
        fallbackImg.decoding = 'async';
        fallbackImg.onload = () => {
          preloadedUrls.add(url);
          preloadedImageElements.set(url, fallbackImg);
          resolve();
        };
        fallbackImg.onerror = () => {
          // Resolve even on failure so other assets continue preloading
          resolve();
        };
        fallbackImg.src = url;
      };

      img.src = url;
    } catch {
      resolve();
    }
  });
};

/**
 * Injects <link rel="preload" as="image"> tags into <head> for highest network priority
 */
export const injectPreloadLinks = (urls: string[]): void => {
  if (typeof document === 'undefined') return;

  urls.forEach((url) => {
    try {
      const existing = document.querySelector(`link[rel="preload"][href="${url}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        link.setAttribute('referrerpolicy', 'no-referrer');
        document.head.appendChild(link);
      }
    } catch {
      // Ignore DOM injection issues
    }
  });
};

let preloadInitiated = false;

/**
 * Primary function called at site opening to preload all facilitators
 * and site assets immediately.
 */
export const preloadAllAssets = async (onProgress?: (loaded: number, total: number) => void): Promise<void> => {
  if (preloadInitiated || typeof window === 'undefined') {
    return;
  }
  preloadInitiated = true;

  const allUrls = getAllSiteAssetUrls();
  const total = allUrls.length;
  let loadedCount = 0;

  // 1. Immediately inject preload links for facilitators to notify HTTP client
  const facilitatorUrls = FACILITATORS_DATA.map((f) => f.image).filter(Boolean);
  injectPreloadLinks(facilitatorUrls);

  // 2. Fetch and decode all images in parallel, prioritizing facilitators
  // Facilitator profiles first (highest priority)
  const priorityPromises = facilitatorUrls.map(async (url) => {
    await preloadImage(url, 'high');
    loadedCount++;
    if (onProgress) onProgress(loadedCount, total);
  });

  // Remaining assets in second wave
  const otherUrls = allUrls.filter((url) => !facilitatorUrls.includes(url));
  const otherPromises = otherUrls.map(async (url) => {
    await preloadImage(url, 'auto');
    loadedCount++;
    if (onProgress) onProgress(loadedCount, total);
  });

  await Promise.allSettled([...priorityPromises, ...otherPromises]);
};

export const isAssetPreloaded = (url: string): boolean => {
  return preloadedUrls.has(url);
};
