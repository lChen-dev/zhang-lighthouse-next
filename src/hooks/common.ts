import { useEffect, useState } from 'react';

/**
 * A hook to set the browser tab title with the suffix "VoltQ"
 * @param title The title of the page
 */
export const usePageTitle = (title?: string): void => {
  useEffect(() => {
    window.document.title = title ? `Lighthouse • ${title}` : 'Lighthouse';
  }, [title]);
};



export const useOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false)
  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}