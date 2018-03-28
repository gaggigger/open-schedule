const Brain = {
  YIQtextColor (bgColor) {
    const r = bgColor.r * 255
    const g = bgColor.g * 255
    const b = bgColor.b * 255
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return (yiq >= 128) ? 'black' : 'white'
  },

  CustomtextColor (bgColor) {
    return (this.colorContrast(bgColor).black > 0.5) ? 'black' : 'white'
  },

  colorContrast (input) {
    return {
      'black': 1 / (1 + 1 / Math.exp(-2.7660863399505615 - 5.18860387802124 * (1 / (1 + 1 / Math.exp(4.198627948760986 + 0.3237767815589905 * (input['r']) - 7.820487976074219 * (input['g']) + 0.2763972878456116 * (input['b'])))) - 8.745107650756836 * (1 / (1 + 1 / Math.exp(7.217971324920654 + 0.8936682939529419 * (input['r']) - 12.640716552734375 * (input['g']) + 0.448782742023468 * (input['b'])))) + 8.836186408996582 * (1 / (1 + 1 / Math.exp(-9.399079322814941 - 1.1196845769882202 * (input['r']) + 15.428106307983398 * (input['g']) - 0.5111451745033264 * (input['b']))))))
    }
  }
}

export default Brain
