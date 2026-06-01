import { cache } from '@/cache'
import { setupUpdateManager } from './updateManager'

export function bootstrapApp() {
  const agreed = cache.get('privacyAgreed')
  if (agreed === undefined || agreed === null)
    cache.set('privacyAgreed', false)

  setupUpdateManager()
}
