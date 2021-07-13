export default {
  /**
   * Slit a string to array by separator
   *
   * @param {string} param
   * @param {string} sep
   * @returns {Array<string>}
   */
  splitStrToArray (param, sep = ',') {
    return (param || '').split(sep)
      .map(s => s.trim())
      .filter(s => s)
  }
}
