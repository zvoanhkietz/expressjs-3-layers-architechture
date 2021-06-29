module.exports = {
  isClass: (func) => {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func))
  }
}
