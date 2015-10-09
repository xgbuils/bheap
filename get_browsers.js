var fs = require('fs')

function get_browsers (conf, fileName) {
  conf || (conf = 'saucelabs.browsers')
  fileName || (fileName = './package.json')
  // Browsers to run on Sauce Labs platforms
  var browsers = JSON.parse(fs.readFileSync(fileName, 'utf8'))
  
  conf.split('.').forEach(function (key) {
    browsers = browsers[key]
  })

  var sauceBrowsers = Object.keys(browsers).reduce(function (memo, browserName) {
    var envs = browsers[browserName]
    // internet explorer -> ie
    var prefix_label = browserName.split(' ');
    if (prefix_label.length > 1) {
      prefix_label = prefix_label.map(function (e) {
        return e[0]
      })
    }
    prefix_label = prefix_label.join('')
    envs.forEach(function (env) {
      var version
      var platform
      if (typeof env === 'string') {
        version = env
      } else {
        version  = env[0]
        platform = env[1]
      }
      var p = platform ? '_' + platform.replace(/\s+/g, '_') : ''
      var label = (prefix_label + '_v' + version + p).toUpperCase()
      memo[label] = {
        base: 'SauceLabs',
        browserName: browserName,
        version: version
      }
      if (platform) {
        memo[label].platform = platform
      }
    })
    return memo
  }, {})

  return sauceBrowsers
}

module.exports = get_browsers