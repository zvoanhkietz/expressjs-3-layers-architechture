module.exports = {
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/configs/**',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageReporters: ['text', 'text-summary']
}
