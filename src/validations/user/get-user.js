import Validator from '../../libs/validator'
import { User } from '../../models'
import ValidationProvider from '../providers'

export default class GetUserValidator extends Validator {
  /**
   * init validator
   *
   * @returns {void}
   */
  init () {
    const userFields = User.getFields()
    this.addProvider(ValidationProvider)
      .addRule({
        field: 'limit',
        args: [[10, 20, 50, 100, 1000]],
        check: 'inlist',
        message: 'limit must be in list [10, 20, 50, 100, 1000]'
      })
      .addRule({
        field: 'fields',
        args: [userFields],
        check: 'commaInlist',
        message: `fields must be in list [${userFields.join(', ')}]`
      })
      .addRule({
        field: 'orders',
        args: [userFields],
        check: 'isValidOrders',
        message: `orders must be in list [${userFields.join(', ')} and has valid format ex:'id asc, account desc']`
      })
  }
}
