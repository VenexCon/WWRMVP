# Who Wants Rubbish?

A full-stack MERN application including Stripe payment integration. This application allows businesses to sign-up create a profile and create listings for desired items, which can be donated by users for free. This application allows users to search listings by distance, location and keywords to find donation opportunities for unwanted items. This application allows charities, shelters and start-ups to request items from unwanted office furntiture through to animal feed and beyond. The aim of this app is to create ap ltform where users can reduce their waste and allow the upcycling and re-use of unwanted items, therefore reducing waste in circulation.

## Features

- Create either a user or business profile, allowing the creation or browsing of listings.
- Create, update and delete listings based on the business subscription plan.
- Subscribe to a plan and let Stripe handle all the payments.
- Contact details based on either business profile or manually inputted data.
- Stripe webhooks handles the payments and sessions.
- MVC architure with Express Node.js framework.
- React-redux toolkit allows for a single source of truth for state management.

## Technologies Used

[![Skills used](https://skillicons.dev/icons?i=js,html,css,tailwind,react,nodejs,redux,express)](https://skillicons.dev)

## Screenshots

![This is the homepage](/frontend/src/assets/ScreenShots/HomePageSS.png)
![Listing Creation](/frontend/src/assets/ScreenShots/ListingCreation.png)
![Listing Screenshot](/frontend/src/assets/ScreenShots/listingSS.png)
![Listings List](/frontend/src/assets/ScreenShots/listingsSS.png)
![Pricing Screenshot](/frontend/src/assets/ScreenShots/PricingSS.png)
![Profile Screenshot](/frontend/src/assets/ScreenShots/ProfileSS.png)

## Deployment

Due to the various API charges and ongoing development, the release of Who Wants Rubbish is being delayed until the payment system is fully operational. 

To test this locally simply clone repo 

``` git clone <url> ```

Install the required packages 

```npm -i ```

You will also need to install the stripe CLI to manage events and ensure any webhooks work as intended and can detect the triggered events. 

Once you have installed the CLI use the below command 

```stripe listen --forward-to http://localhost:5000/YOUR_WEBHOOK_ENDPOINT ```

You can then launch app by navigating to the BE and FE respectivley and running the following command. 

``` npm run start ```


