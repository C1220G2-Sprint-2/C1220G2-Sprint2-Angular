// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: "AIzaSyCBj5bHxpU5iqOHsb88k8Kv-k6620tMHmc",
    authDomain: "project-management-b23f2.firebaseapp.com",
    databaseURL: 'https://meeting-management-ec115-default-rtdb.firebaseio.com',
    projectId: "project-management-b23f2",
    storageBucket: "project-management-b23f2.appspot.com",
    messagingSenderId: "957380437314",
    appId: "1:957380437314:web:8696cf73472352d15354db",
    measurementId: "G-NLN65GBMFB"
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
