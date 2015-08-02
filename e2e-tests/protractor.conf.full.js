exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['fullSpec.js'],
  multiCapabilities: [ {
    browserName: 'chrome'
  }]
}
