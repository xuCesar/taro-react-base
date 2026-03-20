import { cache } from '@/cache'

export function bootstrapApp() {
  const agreed = cache.get('privacyAgreed')
  if (agreed === undefined || agreed === null)
    cache.set('privacyAgreed', false)
}
