export const LOCALES = {
  'zh-CN': {
    label: '中文'
  },
  'en-US': {
    label: 'English'
  }
} as const

export type Locale = keyof typeof LOCALES

export const DEFAULT_LOCALE: Locale = 'zh-CN'

const zhMessages = {
  'common.logout': '退出',
  'common.reload': '重新加载',
  'common.profile': '我的',
  'common.home': '首页',
  'common.disabled': '关闭时统一使用默认中文。',
  'login.appTitle': 'Taro React Base',
  'login.description': '轻量工程骨架，内置路由、缓存、认证、页面状态和服务端状态能力。',
  'login.entryTitle': '登录入口',
  'login.entryDescription': '当前仍可命中 mock 登录接口，参数结构已按真实登录预留。',
  'login.account': '账号',
  'login.password': '密码',
  'login.accountPlaceholder': '账号',
  'login.passwordPlaceholder': '密码',
  'login.submit': '账号登录',
  'home.title': '首页',
  'home.description': '这里保留 starter 的轻量体验，同时引入更稳的基础设施。',
  'home.profileAction': '我的',
  'home.integratedTitle': '已集成能力',
  'home.integratedDescription': 'Taro 4、React Query、类型安全路由、typed cache、Taro.request 请求层。',
  'home.stateManagement': '状态管理',
  'home.serverState': '服务端数据',
  'home.emptyTitle': '等待接入业务模块',
  'home.emptyDescription': '这里适合放你的首页卡片、运营位、待办和模块入口。',
  'home.goProfile': '前往我的页面',
  'profile.title': '我的',
  'profile.description': '这个页面演示了 PageWrapper、加载态、错误态和正常内容态的配合方式。',
  'profile.loadingTitle': '正在加载用户资料',
  'profile.loadingDescription': '示例中通过 React Query 拉取当前用户信息。',
  'profile.errorTitle': '用户信息加载失败',
  'profile.userInfoTitle': '用户信息',
  'profile.currentUser': '当前用户：{nickname}',
  'profile.unconnectedUser': '未接入真实接口',
  'profile.themeTitle': '主题设置',
  'profile.themeDescription': '启用后可切换浅色和深色，后续可继续在主题配置里扩展。',
  'profile.themeSwitchTitle': '启用主题切换',
  'profile.themeSwitchDescription': '关闭时统一使用默认浅色主题。',
  'profile.i18nTitle': '多语言设置',
  'profile.i18nDescription': '启用后可在中文和英文之间切换，后续可继续扩展更多语言。',
  'profile.i18nSwitchTitle': '启用多语言',
  'profile.i18nSwitchDescription': '关闭时统一使用默认中文。',
  'profile.frameworkTitle': '框架建议',
  'profile.frameworkDescription': '页面状态尽量本地化，全局状态交给 Zustand，服务端状态交给 React Query。',
  'theme.light': '浅色',
  'theme.dark': '深色',
  'locale.zh-CN': '中文',
  'locale.en-US': 'English'
} as const

export type I18nKey = keyof typeof zhMessages

const enMessages: Record<I18nKey, string> = {
  'common.logout': 'Log out',
  'common.reload': 'Reload',
  'common.profile': 'Profile',
  'common.home': 'Home',
  'common.disabled': 'When disabled, Chinese is used by default.',
  'login.appTitle': 'Taro React Base',
  'login.description': 'A lightweight app foundation with routing, cache, auth, page states, and server-state support.',
  'login.entryTitle': 'Sign in',
  'login.entryDescription': 'The mock login API is still available, while the params are ready for real auth.',
  'login.account': 'Account',
  'login.password': 'Password',
  'login.accountPlaceholder': 'Account',
  'login.passwordPlaceholder': 'Password',
  'login.submit': 'Sign in with account',
  'home.title': 'Home',
  'home.description': 'Keeps the starter lightweight while adding steadier foundation capabilities.',
  'home.profileAction': 'Profile',
  'home.integratedTitle': 'Integrated capabilities',
  'home.integratedDescription': 'Taro 4, React Query, typed routing, typed cache, and the Taro.request layer.',
  'home.stateManagement': 'State management',
  'home.serverState': 'Server state',
  'home.emptyTitle': 'Waiting for business modules',
  'home.emptyDescription': 'This area is ready for home cards, campaigns, todos, and module entries.',
  'home.goProfile': 'Go to profile',
  'profile.title': 'Profile',
  'profile.description': 'This page demonstrates PageWrapper, loading, error, and normal content states.',
  'profile.loadingTitle': 'Loading user profile',
  'profile.loadingDescription': 'The demo fetches current user data with React Query.',
  'profile.errorTitle': 'Failed to load user info',
  'profile.userInfoTitle': 'User info',
  'profile.currentUser': 'Current user: {nickname}',
  'profile.unconnectedUser': 'Real API not connected',
  'profile.themeTitle': 'Theme settings',
  'profile.themeDescription': 'Enable it to switch between light and dark. More themes can be added later.',
  'profile.themeSwitchTitle': 'Enable theme switch',
  'profile.themeSwitchDescription': 'When disabled, light theme is used by default.',
  'profile.i18nTitle': 'Language settings',
  'profile.i18nDescription': 'Enable it to switch between Chinese and English. More languages can be added later.',
  'profile.i18nSwitchTitle': 'Enable languages',
  'profile.i18nSwitchDescription': 'When disabled, Chinese is used by default.',
  'profile.frameworkTitle': 'Framework advice',
  'profile.frameworkDescription': 'Keep page state local, global state in Zustand, and server state in React Query.',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'locale.zh-CN': '中文',
  'locale.en-US': 'English'
}

export const I18N_MESSAGES: Record<Locale, Record<I18nKey, string>> = {
  'zh-CN': zhMessages,
  'en-US': enMessages
}

export const LOCALE_OPTIONS = Object.keys(LOCALES).map(locale => ({
  value: locale as Locale,
  label: I18N_MESSAGES[locale as Locale][`locale.${locale}` as I18nKey]
}))

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in LOCALES
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export function translate(locale: Locale, key: I18nKey, values?: Record<string, string | number>) {
  const template = I18N_MESSAGES[locale][key] || I18N_MESSAGES[DEFAULT_LOCALE][key]
  if (!values)
    return template

  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? ''))
}

