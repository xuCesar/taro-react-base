const isH5 = process.env.TARO_ENV === 'h5'

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-rem-to-responsive-pixel': {
      rootValue: 32,
      propList: ['*'],
      transformUnit: isH5 ? 'px' : 'rpx'
    }
  }
}
