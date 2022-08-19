export default function event(action) {
  if (window?.gtag && action) {
    window.gtag('event', action)
  }
}
