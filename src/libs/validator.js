export default class Validator {
  /**
   * constructor
   *
   * @param {Array} rules
   */
  constructor (rules = []) {
    this.providers = {general: []}
    this.rules = rules
    this.errors = []
    this.init()
  }

  /**
   * init is method for inherited
   *
   * @returns {void}
   */
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
    const providerName = rule.provider || 'general'
    if (!(providerName in this.providers)) {
      throw new Error(`Provider ${providerName} not found.`)
    }

    let checkOk = null
    if (typeof rule.check === 'string') {
      for (const provider of this.providers[providerName]) {
        if (rule.check in provider) {
          checkOk = provider[rule.check]
          break
        }
      }
    }

    if (checkOk === null) {
      throw new Error(`Function ${rule.check} not found.`)
    }
    return checkOk
  }

  /**
   * Add a provider to storage
   *
   * @param {Object} provider
   * @param {string} name of provider
   * @returns {Validator}
   */
  addProvider (provider, name = 'general') {
    this.providers[name] = this.providers[name] || []
    this.providers[name].push(provider)
    return this
  }

  /**
   * Add a rule to list
   *
   * @param {Object} rule
   * @returns {Validator}
   */
  addRule (rule) {
    this.rules.push(rule)
    return this
  }

  /**
   * Get list of message errors
   *
   * @returns {Array<Object>}
   */
  getMessages () {
    return this.errors
  }
}
