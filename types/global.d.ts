/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    TARO_ENV: 'weapp' | 'h5' | 'alipay' | 'swan' | 'tt' | 'quickapp' | 'qq' | 'jd'
    TARO_APP_API_BASE: string
  }
}
