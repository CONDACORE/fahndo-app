'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-environment
  ENV: {
    /*inject-env*/
    'parse': {
      'appId': 'ftaCI2c3sZcofHn0WV6p',
      'serverUrl': 'https://fahndo.condacore.com/parse'
    },
    'push': {
      'appId': '#####-#####',
      'googleProjectNumber': 'A000000000000'
    },
    'admob': {
      'interstitialForAndroid': 'ca-app-pub-5724619773320600/5697108772',
      'interstitialForiOS': 'ca-app-pub-5724619773320600/1266909172',
      'bannerId': 'ca-app-pub-5724619773320600/7313442779'
    },
    'gaTrackingId': 'UA-########-#',
    'theme': 'assertive',
    'unit': 'km',
    'mapType': 'normal',
    'statusBarColor': '#00000'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
