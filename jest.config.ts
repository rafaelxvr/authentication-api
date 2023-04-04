export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testEnviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
