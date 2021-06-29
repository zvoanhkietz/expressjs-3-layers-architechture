module.exports = class Validator {
  /**
   * constructor
   * @param {Array} rules
   */
  constructor (rules = []) {
    this.providers = []
    this.rules = rules
    this.errors = []
    this.init()
  }

  init () {

  }

  /**
   * Check is valid data
   *
   * @param {Object} data
   * @returns boolean
   */
  isValid (data) {
    this.errors = []
    for (const rule of this.rules) {
      let ok = this.findValidate(rule)
      const args = [data[rule.field], ...(rule.args || [])]
      if (!ok(...args)) {
        this.errors.push({
          value: data[rule.field],
          field: rule.field,
          message: rule.message
        })
      }
    }
    return this.errors.length === 0
  }

  /**
   * find function to check on provider
   *
   * @param {Object} rule
   * @returns Function to check
   */
  findValidate (rule) {
    let checkOk = null
    if (typeof rule.check === 'string') {
      for (const provider of this.providers) {
        if (rule.check in provider) {
          checkOk = provider[rule.check]
          break
        }
      }
    }

    if (checkOk === null) {
      throw new Error(`function ${rule.check} not found.`)
    }
    return checkOk
  }

  /**
   * Add a provider to storage
   *
   * @param {Object} provider
   * @returns
   */
  addProvider (provider) {
    this.providers.push(provider)
    return this
  }

  addRule (rule) {
    this.rules.push(rule)
    return this
  }

  getMessages () {
    return this.errors
  }
}
