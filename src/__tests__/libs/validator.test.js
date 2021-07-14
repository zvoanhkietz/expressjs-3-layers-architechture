import {describe, expect, test} from '@jest/globals'
import Validator from '@libs/validator'

describe('Validator has', () => {
  const validator = new Validator([
    {
      field: 'limit',
      args: [[10, 20, 50, 100, 1000]],
      check: 'inList',
      message: 'limit must be in list [10, 20, 50, 100, 1000]'

    }
  ])
  validator.addProvider({
    inList (value, list) {
      return list.includes(value)
    }
  })

  test('isValid method return true is exactly', () => {
    const resultTrue = validator.isValid({ limit: 10 })
    expect(resultTrue).toBe(true)
  })
  test('isValid method return false is exactly', () => {
    const resultTrue = validator.isValid({ limit: 1 })
    expect(resultTrue).toBe(false)
  })
  test('getMessages method return error list when invalid', () => {
    validator.isValid({ limit: 1 })
    const messages = validator.getMessages()
    expect(messages.length).toBe(1)
    expect(messages[0]).toMatchObject({
      value: 1,
      field: 'limit',
      message: 'limit must be in list [10, 20, 50, 100, 1000]'
    })
  })
})
