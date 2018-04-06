// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDCjYvnWnU86h8SQHUh5iGMKTMp6X1eiTc',
    authDomain: 'sfeir-athlon.firebaseapp.com',
    databaseURL: 'https://sfeir-athlon.firebaseio.com',
    projectId: 'sfeir-athlon',
    storageBucket: 'sfeir-athlon.appspot.com',
    messagingSenderId: '1068492240053'
  }
};
