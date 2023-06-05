This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
* First you need to initialize the dependencies.
```bash
npm 
# or
yarn 
```
If not Yarn
```bash
npm install --global yarn
```
The project uses Firebase to interact with the database through an API. To work correctly with the project, you need to register in [Firebase](https://console.firebase.google.com/). 
Next step create a new project and open settings. In the settings, create a new application.
After initialization, firebaseConfig will appear, which looks like this:
```bash
const firebaseConfig = {
  apiKey: "************",
  authDomain: "************",
  projectId: "****************",
  storageBucket: "********************",
  messagingSenderId: "************",
  appId: "*****************",
  measurementId: "***************",
};
```
To connect to the database, you need to create [.env.local](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) a file in the root folder of the project and fill it accordingly.
```bash
  NEXT_PUBLIC_FIREBASE_API_KEY = "your API_KEY"
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your AUTH_DOMAIN"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your PROJECT_ID"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your STORAGE_BUCKET"
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your MESSAGING_SENDER_ID"
  NEXT_PUBLIC_FIREBASE_APP_ID = "your APP_ID"
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your MEASUREMENT_ID"
```
Then you can run the project.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
to enter the application as an administrator, type:
* login> admin@gmail.com
* password> admini

Of course, you can also register your own user.

## Implemented opportunities in the project

* registration and authorization
* personal cabinet
* creating discount coupons
* adding products by category
* search page with the ability to search by category
* navigation on the site
* order basket
* favorite products
* product page
* order page
* adding and changing personal information

## [Demo](https://deli-git-dev-hrynevych.vercel.app/)
Link https://deli-git-dev-hrynevych.vercel.app/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
