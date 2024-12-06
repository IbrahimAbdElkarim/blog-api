module.exports = {
  moduleFileExtensions: ['js', 'json', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  testRegex: '.spec.js$',
  transformIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  collectCoverage: false,
  verbose: true,
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/before-test-run.js'],
  displayName: {
    name: 'STARTER',
    color: 'blue'
  }
};
