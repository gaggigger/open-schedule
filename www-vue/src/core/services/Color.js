const hexChars = 'a-f\\d'
const match3or4Hex = `#?[${hexChars}]{3}[${hexChars}]?`
const match6or8Hex = `#?[${hexChars}]{6}([${hexChars}]{2})?`

const nonHexChars = new RegExp(`[^#${hexChars}]`, 'gi')
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i')

const Color = {
  /**
   * Usage convertHex('#A7D136',50)
   * @param hex
   * @param opacity
   * @returns {string}
   */
  convertHex (hex, opacity) {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  },

  /**
   * From http://www.javascripter.net/faq/hextorgb.htm
   * @param h
   * @returns {Number}
   */
  hexToR (h) {
    return parseInt((this.cutHex(h)).substring(0, 2), 16)
  },
  /**
   * From http://www.javascripter.net/faq/hextorgb.htm
   * @param h
   * @returns {Number}
   */
  hexToG (h) {
    return parseInt((this.cutHex(h)).substring(2, 4), 16)
  },
  /**
   * From http://www.javascripter.net/faq/hextorgb.htm
   * @param h
   * @returns {Number}
   */
  hexToB (h) {
    return parseInt((this.cutHex(h)).substring(4, 6), 16)
  },
  /**
   * From http://www.javascripter.net/faq/hextorgb.htm
   * @param h
   * @returns {string}
   */
  cutHex (h) {
    return (h.charAt(0) === '#') ? h.substring(1, 7) : h
  },

  rgbToHex (R, G, B) {
    return this.toHex(R) + this.toHex(G) + this.toHex(B)
  },
  toHex (n) {
    n = parseInt(n, 10)
    if (isNaN(n)) return '00'
    n = Math.max(0, Math.min(n, 255))
    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16)
  },

  /**
   * From https://github.com/sindresorhus/hex-rgb
   * hexRgb('4183c4') => {red: 65, green: 131, blue: 196, alpha: 255}
   * hexRgb('#4183c4') => {red: 65, green: 131, blue: 196, alpha: 255}
   * hexRgb('#fff') => {red: 255, green: 255, blue: 255, alpha: 255}
   * hexRgb('#4183c488') => {red: 65, green: 131, blue: 196, alpha: 136}
   * hexRgb('#0008') => {red: 0, green: 0, blue: 0, alpha: 136}
   * hexRgb('#4183c488', {format: 'array'}) => [65, 131, 196, 136]
   * @param hex
   * @param options
   * @returns {*}
   */
  hexRgb (hex, options = {}) {
    if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
      throw new TypeError('Expected a valid hex string')
    }

    hex = hex.replace(/^#/, '')
    let alpha = 255

    if (hex.length === 8) {
      alpha = parseInt(hex.slice(6, 8), 16)
      hex = hex.substring(0, 6)
    }

    if (hex.length === 4) {
      alpha = parseInt(hex.slice(3, 4).repeat(2), 16)
      hex = hex.substring(0, 3)
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }

    const num = parseInt(hex, 16)
    const red = num >> 16
    const green = (num >> 8) & 255
    const blue = num & 255

    return options.format === 'array' ? [red, green, blue, alpha] : {red, green, blue, alpha}
  },

  ColorLuminance (hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0
    // convert to decimal and change luminosity
    let rgb = '#'
    let c
    let i
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }
    return rgb
  }
}

export default Color
