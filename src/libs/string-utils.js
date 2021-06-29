module.exports = {
  splitComma: (param) => {
    return (param || '').split(',')
      .map(s => s.trim())
      .filter(s => s)
  }
}
