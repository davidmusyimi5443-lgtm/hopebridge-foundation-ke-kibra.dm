/**
 * Build a Netlify Image CDN URL for an asset in /public/img.
 * Originals are large AI-generated PNGs, so pages always request a resized WebP.
 */
export function img(file: string, width: number, quality = 75) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=${quality}`
}

/** srcSet across common breakpoints for responsive images. */
export function imgSet(file: string, widths = [480, 800, 1200, 1600]) {
  return widths.map((w) => `${img(file, w)} ${w}w`).join(', ')
}
