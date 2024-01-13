const { defaults } = require('jest-config')

module.exports = {
  moduleDirectories: ['node_modules', 'utils', __dirname],
  preset: 'react-native',
  moduleFileExtensions: ['tsx', ...defaults.moduleFileExtensions]
}
