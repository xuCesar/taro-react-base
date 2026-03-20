import type { UserConfigExport } from '@tarojs/cli'

export default {
  plugins: ['@tarojs/plugin-mock'],
  logger: {
    quiet: false,
    stats: true
  }
} satisfies UserConfigExport
