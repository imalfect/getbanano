export function svgStringToBase64(svgString) {
  // Encode the SVG string to Base64
  return 'data:image/svg+xml;base64,' + window.btoa(svgString);
}
