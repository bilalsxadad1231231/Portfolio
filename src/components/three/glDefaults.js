/**
 * Shared WebGL canvas settings.
 *
 * Phones get a lower pixel ratio and no high-performance hint: asking a mobile
 * GPU for a 3x backing store on a full-width canvas is how these scenes end up
 * janky or dropped entirely.
 */
export const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(max-width: 768px)').matches ||
    window.matchMedia?.('(pointer: coarse)').matches);

export const dprRange = () => (isSmallScreen() ? [1, 1.25] : [1, 1.75]);

export const glOptions = () => ({
  antialias: !isSmallScreen(),
  alpha: true,
  powerPreference: isSmallScreen() ? 'default' : 'high-performance',
});

/**
 * Watches for the browser reclaiming the WebGL context — which phones do under
 * memory pressure — and reports it, so the section can fall back to its flat
 * layout instead of leaving a blank rectangle that never recovers.
 */
export const watchContextLoss = (gl, onLost) => {
  const canvas = gl.domElement;
  const lost = (event) => {
    event.preventDefault();
    onLost?.();
  };
  canvas.addEventListener('webglcontextlost', lost, false);
  return () => canvas.removeEventListener('webglcontextlost', lost);
};
