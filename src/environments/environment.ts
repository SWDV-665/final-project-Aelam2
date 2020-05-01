// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_HOST: "https://loan-calculator-api-production.azurewebsites.net",
  GOOGLE_CLIENT_ID: "395522895595-mg2923mps4fm0jlb9p9j3ag0hsfrrvlg.apps.googleusercontent.com",
  FACEBOOK_APP_ID: "649424762459082",
  storage: {
    JWT_TOKEN: "JWT_TOKEN",
    HIDDEN_LOANS: "HIDDEN_LOANS"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
