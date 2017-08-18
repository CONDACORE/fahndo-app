'use strict';
/*global Parse cordova */
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngStorage',
  'ngAnimate',
  'imgFallback',
  'pascalprecht.translate',
  'pasvaz.bindonce',
  'ionic.rating'
])
.run(function ($ionicPlatform, $rootScope, $state, $localStorage, User,
  Pushwoosh, GoogleAnalytics, Config, StatusBar, $cordovaGlobalization,
  $translate, AdMobService) {

  $rootScope.theme = Config.ENV.theme;

  if (!$localStorage.unit) {
    $localStorage.unit = Config.ENV.unit;
  }

  if (!$localStorage.mapType) {
    $localStorage.mapType = Config.ENV.mapType;
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

    if (toState.name === 'walkthrough' && $localStorage.walkthrough && !toParams.force) {
      $state.go('app.categories');
      event.preventDefault();
    }
  });

  Parse.initialize(Config.ENV.parse.appId);
  Parse.serverURL = Config.ENV.parse.serverUrl;

  $ionicPlatform.ready(function () {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if ($localStorage.lang) {
      $translate.use($localStorage.lang);
    } else {
      if (typeof navigator.globalization !== 'undefined') {
        $cordovaGlobalization.getPreferredLanguage().then(function (language) {
          $translate.use((language.value).split('-')[0]);
        }, null);
      }
    }

    AdMobService.prepareInterstitial(
      Config.ENV.admob.interstitialForAndroid,
      Config.ENV.admob.interstitialForiOS);

    StatusBar.init(Config.ENV.statusBarColor);
    GoogleAnalytics.init(Config.ENV.gaTrackingId);

    Pushwoosh.init(Config.ENV.push.appId, Config.ENV.push.googleProjectNumber);
    Pushwoosh.registerDevice()
      .then(function (result) {
        console.log('PushWoosh response on registerDevice: ' + result);
      });

  });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,
  $provide, $translateProvider) {

  $translateProvider.translations('de', {
    appTitle: 'Kategorien',
    categoriesTitle: 'Kategorien',
    placesTitle: 'Liste',
    reviewsTitle: 'Beiträge / Tipps',
    profileTitle: 'Profil',
    newPlaceTitle: 'Neuer Vorfall',
    mapTitle: 'Karte',
    nearmeText: 'Kategorien',
    addNewPlaceText: 'Vorfall hinzufügen',
    profileText: 'Profil',
    settingsText: 'Einstellungen',
    logoutText: 'Ausloggen',
    signInViaFacebook: 'Mit Facebook einloggen',
    signInText: 'Anmelden',
    signUpText: 'Account erstellen',
    signUpSubmitText: 'Registrieren',
    signInError: 'Login fehlgeschlagen',
    nameText: 'Anzeigename (öffentlich)',
    emailText: 'E-Mail Adresse',
    passwordText: 'Passwort',
    userSinceText: 'Mitglied seit dem',
    getDirectionsText: 'In Karten App öffnen',
    callToText: 'Zust. Einrichtung: ',
    openWebsiteText: 'Mehr Infos / Quelle',
    closeText: 'Schließen',
    okText: 'Ok',
    placesNotFoundText: 'Du kannst Dich glücklich schätzen, es gibt keine Vorfälle in der Nähe. Du darfst uns aber gerne Helfen und Dir bekannte Vorfälle zur App hinzufügen.',
    reviewsNotFoundText: 'Zu diesem Ereignis gibt es noch keine Beiträge...',
    errorText: 'Hoppla! Es ist ein Fehler aufgetreten...',
    tryAgainText: 'Erneut versuchen',
    distanceUnitText: 'Längeneinheit',
    emailInvalidText: 'E-Mail ist ungültig',
    formInvalidText: 'Die benötigten Felder ausfüllen',
    authInvalidText: 'Ungültige Anmeldeinformationen',
    emailTakenText: 'Diese E-Mail Adresse ist schon in Verwendung',
    twoBlocksText: '2 Straßen',
    sixBlocksText: '6 Straßen',
    chooseDistanceText: 'Distanz wählen',
    mapTypeText: 'Kartenansicht',
    normalMapText: 'Normal',
    satelliteMapText: 'Satellit',
    searchInThisAreaText: 'In dieser Gegend suchen',
    inputTitleText: 'Titel *',
    inputDescriptionText: 'Beschreibung (am Besten mit Datum, Uhrzeit, Ort...)*',
    labelDescriptionText: 'Beschreibung',
    inputCategoryText: 'Kategorie wählen *',
    inputAddressText: 'Adresse',
    inputPhoneText: 'Telefonnummer z.B. Polizeiwache (wenn verfügb.)',
    inputWebsiteText: 'Website bzw. Quelle (wenn verfügbar)',
    buttonSubmitPlaceText: 'Hinzufügen',
    errorFileNotSupportedText: 'Datei nicht unterstützt',
    errorFileTooLargeText: 'Datei zu groß (Max: 2MB)',
    errorChooseCategoryText: 'Wähle eine Kategorie',
    errorUploadImageText: 'Lade mind. ein Bild hoch',
    placeSavedText: 'Vorfall abgeschickt. Er wird derzeit geprüft!',
    reviewModalTitle: 'Einen Beitrag verfassen',
    rateText: 'Vorfall nach Wichtigkeit bewerten:',
    writeReviewButtonText: 'Scheibe einen Breitrag / Tipp',
    commentReviewInputText: 'Informationen eintragen. Beispiel: Ich habe gehört / gesehen dass...',
    submitReviewButtonText: 'Beitrag abschicken',
    loadingText: 'laden...',
    openReviewsButtonText: 'Alle Beiträge / Tipps anschauen',
    placeNotFoundErrorText: 'Nichts gefunden',
    commentRequiredErrorText: 'Beschreibung wird benötigt',
    commentTooShortErrorText: 'Beitrag zu kurz. Schreibe etwas mehr.',
    successSubmitReviewText: 'Beitrag wurde gespeichert',
    cancelText: 'Abbrechen',
    chooseOptionText: 'Wähle eine Option',
    photoLibraryText: 'Foto auswählen',
    cameraText: 'Foto aufnehmen',
    searchText: 'Suchen',
    authModalText: 'Wir müssen etwas mehr über Dich wissen. Bitte einloggen oder registrieren. Der Anzeigename kann später unter "Profil" geändert werden.',
    loggedInAsText: 'Eingeloggt mit',
    loggedOutText: 'Du hast dich ausgeloggt',
    emailFacebookTakenText: 'Diese E-Mail Adresse wird schon von einem anderen Account verwendet',
    chooseLanguageText: 'Sprache der Benutzeroberfläche',
    englishText: 'Englisch',
    germanText: 'Deutsch',
    favoritesText: 'Merkliste',
    emptyFavoritesText: 'Noch nichts vorhanden',
    addFavoriteText: 'Zur Merkliste',
    addedToFavoritesText: 'In die Merkliste gepackt',
    othersText: 'Sonstiges',
    openWalkthroughText: 'Einführung öffnen',
    profileModalTitle: 'Profil bearbeiten',
    profileSubmitText: 'Fertig',
    profileUpdated: 'Profil aktualisiert',
    profileErrorUpdate: 'Profil nicht aktualisiert',
    deleteAccountText: 'Account löschen',
    deleteAccountConfirmText: 'Willst du deinen Account wirklich löschen?',
    deleteAccountSuccessText: 'Account gelöscht!',
    deleteAccountErrorText: 'Account NICHT gelöscht!',
    forgotPasswordText: 'Passwort vergessen?',
    resetPasswordText: 'Passwort zurücksetzen',
    recoverPasswordSuccessText: 'Wir schicken dir einen Link zur Passworterstellung per E-Mail',
    emailNotFoundText: 'Nutzer nicht gefunden',
    noPlacesFoundText: 'Es konnten keine Straftaten gefunden werden',
    searchPlaceholderViewText: 'Straftaten nach Name suchen',
    searchAddressText: 'Ort des Geschehens*',
    errorGpsDisabledText: 'Standort-Einstellungen sind zur Zeit deaktiviert. Bitte schalte GPS und WLAN in den Standort-Einstellungen ein',
    errorLocationMissingText: 'Es ist uns nicht möglich Deinen aktuellen Standort zu bestimmen. Bitte probiere es in ein paar Minuten erneut',
    getStartedText: 'Los geht\'s',
    slide1Text: 'Stöber in zahlreichen Kategorien nach aktuellen Ereignissen',
    slide2Text: 'Übersichtlich aufgelistet und nach Entfernung sortiert',
    slide3Text: 'Auf der Karte siehst Du was in Deiner Umgebung los ist',
    slide4Text: 'Detaillierte Informationen und Bilder',
    slide5Text: 'Schreibe Beträge und hilf dabei einen Vorfall aufzuklären',
    slide6Text: 'Hilf mit, indem du selbst  Vorfälle in die App einträgst',
    changePhotoButtonText: 'Profilbild ändern'
  });
  $translateProvider.translations('en', {
    appTitle: 'Categories',
    categoriesTitle: 'Categories',
    placesTitle: 'List',
    reviewsTitle: 'Contributions',
    profileTitle: 'Profile',
    newPlaceTitle: 'New incident',
    mapTitle: 'Map',
    nearmeText: 'Categories',
    addNewPlaceText: 'Add a offense',
    profileText: 'Profile',
    settingsText: 'Settings',
    logoutText: 'Log Out',
    signInViaFacebook: 'Login with Facebook',
    signInText: 'Sign In',
    signUpText: 'Create an Account',
    signUpSubmitText: 'Sign Up',
    signInError: 'Login failed',
    nameText: 'Name',
    emailText: 'Email',
    passwordText: 'Password',
    userSinceText: 'User since',
    getDirectionsText: 'Get directions',
    callToText: 'Call to',
    openWebsiteText: 'More infos online',
    closeText: 'close',
    okText: 'Ok',
    placesNotFoundText: 'There are no places nearby. Please try another option.',
    reviewsNotFoundText: 'No contributions yet.',
    errorText: 'Ooops. There was an error...',
    tryAgainText: 'Try again',
    distanceUnitText: 'Distance unit',
    emailInvalidText: 'Email is invalid',
    formInvalidText: 'Fill the required fields',
    authInvalidText: 'Invalid credentials',
    emailTakenText: 'The email has already been taken',
    twoBlocksText: '2 blocks',
    sixBlocksText: '6 blocks',
    chooseDistanceText: 'Choose a distance',
    mapTypeText: 'Map type',
    normalMapText: 'Normal',
    satelliteMapText: 'Satellite',
    searchInThisAreaText: 'Search in this area',
    inputTitleText: 'Title *',
    inputDescriptionText: 'Description of the Offence*',
    labelDescriptionText: 'Description',
    inputCategoryText: 'Choose a category *',
    inputAddressText: 'Address',
    inputPhoneText: 'Phone (Not necessarily required)',
    inputWebsiteText: 'Website / Source',
    buttonSubmitPlaceText: 'Add',
    errorFileNotSupportedText: 'File not supported',
    errorFileTooLargeText: 'File too large (Max: 2MB)',
    errorChooseCategoryText: 'Choose a category',
    errorUploadImageText: 'Upload at least the first image',
    placeSavedText: 'Place saved',
    reviewModalTitle: 'Add your review',
    rateText: 'Rate offense by importance:',
    writeReviewButtonText: 'Write a contribution',
    commentReviewInputText: 'Enter your comment about the place here...',
    submitReviewButtonText: 'Submit review',
    loadingText: 'Loading',
    openReviewsButtonText: 'See all the reviews',
    placeNotFoundErrorText: 'Offense not found',
    commentRequiredErrorText: 'Comment field is required',
    commentTooShortErrorText: 'Comment too short',
    successSubmitReviewText: 'Your review has been saved',
    cancelText: 'Cancel',
    chooseOptionText: 'Choose an option',
    photoLibraryText: 'Photo Library',
    cameraText: 'Camera',
    searchText: 'Search',
    authModalText: 'We need to know more about you. Log In or register.',
    loggedInAsText: 'Logged in as',
    loggedOutText: 'You have logged out',
    emailFacebookTakenText: 'The email address is already in use on another account',
    chooseLanguageText: 'Language of the Userinterface',
    englishText: 'English',
    germanText: 'German',
    favoritesText: 'Watch list',
    emptyFavoritesText: 'Watch list is empty',
    addFavoriteText: 'Add to favorites',
    addedToFavoritesText: 'Offense saved',
    othersText: 'Others',
    openWalkthroughText: 'Open Walkthrough',
    profileModalTitle: 'Edit your profile',
    profileSubmitText: 'Update',
    profileUpdated: 'Profile updated',
    profileErrorUpdate: 'Profile not updated',
    deleteAccountText: 'Delete account',
    deleteAccountConfirmText: 'Are you sure you want to delete your account?',
    deleteAccountSuccessText: 'Account deleted',
    deleteAccountErrorText: 'Account not deleted',
    forgotPasswordText: 'Forgot password?',
    resetPasswordText: 'Reset password',
    recoverPasswordSuccessText: 'You will receive a link to create a new password via email',
    emailNotFoundText: 'User not found',
    noPlacesFoundText: 'We couldn\'t find any offenses',
    searchPlaceholderViewText: 'Search offenses by name',
    searchAddressText: 'Enter the place of the crime',
    errorGpsDisabledText: 'Location options are currently disabled. Turn on GPS and wireless network in location setting',
    errorLocationMissingText: 'It\'s not been possible to determine your current location. Try again after few minutes',
    getStartedText: 'Get Started',
    slide1Text: 'Welcome to Fahndo!',
    slide2Text: 'The offenses automatically arrange themselves according to their proximity',
    slide3Text: 'Clear map with pins and Infos',
    slide4Text: 'Detailed information and pictures',
    slide5Text: 'Interact with other users and share information',
    slide6Text: 'Add an incident',
    changePhotoButtonText: 'Change profile picture'
  });
  $translateProvider.preferredLanguage('de');
  $translateProvider.fallbackLanguage('en');

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/walkthrough');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('app', {
      url: '/app?clear',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl'
    })
    .state('walkthrough', {
      url: '/walkthrough?force',
      templateUrl: 'main/templates/walkthrough.html',
      controller: 'WalkthroughCtrl',
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/categories.html',
          controller: 'CategoryListCtrl'
        }
      }
    })
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/search.html',
          controller: 'SearchCtrl'
        }
      }

    })
    .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/favorites.html',
          controller: 'FavoriteListCtrl'
        }
      }
    })
    .state('app.places', {
      url: '/places/:categoryId/:categoryTitle',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/places.html',
          controller: 'PlaceListCtrl'
        }
      }
    })
    .state('app.place', {
      url: '/place/:placeId',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/place.html',
          controller: 'PlaceDetailCtrl'
        }
      }
    })
    .state('app.reviews', {
      url: '/place/:placeId/reviews',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/reviews.html',
          controller: 'ReviewListCtrl'
        }
      }
    })
    .state('app.new', {
      url: '/new',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/place-new.html',
          controller: 'PlaceNewCtrl'
        }
      }
    })
    .state('app.map', {
      url: '/map/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/map.html',
          controller: 'MapCtrl'
        }
      }
    });
});
