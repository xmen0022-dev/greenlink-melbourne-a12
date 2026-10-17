# GreenLink Melbourne

GreenLink Melbourne is a Vue 3 application that helps residents discover green
spaces, find native plants, join community events, and register volunteer
interest. Firebase provides authentication, Firestore persistence, and hosting;
EmailJS delivers confirmation emails.

Firebase Cloud Functions validates event registrations on the server and
provides a live community-impact summary for the home page.

## Live application

<https://fit5032-19cab.web.app>

Firebase Hosting serves the Vite production build and rewrites deep links to the
Vue application entry point.

## Local development

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Firebase and EmailJS public
configuration values before starting the application.

## Build and deploy

```sh
npm run build
npm run firebase:deploy:hosting
npm run firebase:deploy:functions
```

The Green Spaces and Community Events pages include reusable interactive data
tables with global and per-column search, sorting, pagination, and row actions.

The functions run on Node.js 22 in `australia-southeast2`, with bounded runtime
resources and Emulator integration coverage.
