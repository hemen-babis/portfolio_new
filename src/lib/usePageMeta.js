export function usePageMeta({ title, description }) {
  if (typeof document === 'undefined') return
  // set title
  if (title) document.title = title
  // set or create meta description
  if (description) {
    let el = document.querySelector('meta[name="description"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', description)
  }
}

