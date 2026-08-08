import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Loads one texture without suspending.
 *
 * drei's `useTexture` throws a promise, so every sprite under a single
 * <Suspense> boundary waits for the slowest one and the boundary renders its
 * fallback — nothing — until the whole set is decoded. On a phone that reads as
 * an empty section for several seconds.
 *
 * This returns `null` until its own image is ready, so each mesh can draw a
 * placeholder immediately and swap in artwork the moment it individually
 * arrives. The scene fills in progressively instead of appearing all at once.
 */
const cache = new Map();

function load(url) {
  if (cache.has(url)) return cache.get(url);

  const promise = new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      reject
    );
  });

  cache.set(url, promise);
  return promise;
}

export default function useLazyTexture(url) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!url) return undefined;
    let active = true;
    setTexture(null);

    load(url)
      .then((t) => {
        if (active) setTexture(t);
      })
      .catch(() => {
        // A missing image should cost one placeholder, not the whole scene.
      });

    return () => {
      active = false;
    };
  }, [url]);

  return texture;
}

/**
 * Progress across a set of URLs, for the "17 / 59" readout. Counts a URL as
 * done once its texture resolves, whether or not the caller has mounted it.
 */
export function useTextureProgress(urls) {
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let active = true;
    let done = 0;
    setLoaded(0);

    urls.forEach((url) => {
      load(url)
        .catch(() => {})
        .then(() => {
          done += 1;
          if (active) setLoaded(done);
        });
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.length]);

  return { loaded, total: urls.length, done: loaded >= urls.length };
}
