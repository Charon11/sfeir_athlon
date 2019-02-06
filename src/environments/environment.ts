// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBAU8EVJl2bUKvAv90d7kdG35YODa3vPEg',
    authDomain: 'sfeirathlon.firebaseapp.com',
    databaseURL: 'https://sfeirathlon.firebaseio.com',
    projectId: 'sfeirathlon',
    storageBucket: 'sfeirathlon.appspot.com',
    messagingSenderId: '134999122609'
  },
  collections : {
    tl: 'team-leader',
    events: 'events'
  }
};
