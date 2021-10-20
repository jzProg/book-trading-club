# Book Track

[![Build Status](https://travis-ci.org/jzProg/book-trading-club.svg?branch=master)](https://travis-ci.org/github/jzProg/book-trading-club)
[![Demo](https://img.shields.io/badge/demo-online-green.svg)](https://book-trading-club-24f23.web.app/)

A book tracking app written in Vue.js. Users can search, add, categorize and rate books.

## Technologies and Tools
<img src="https://img.shields.io/badge/vuejs%20-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D"/><img src="https://img.shields.io/badge/webpack%20-%238DD6F9.svg?&style=for-the-badge&logo=webpack&logoColor=black"/><img src="https://img.shields.io/badge/firebase%20-%23039BE5.svg?&style=for-the-badge&logo=firebase"/>

- **Webpack** (v3.6.0) / **Vue** (v2.5.2) for frontend.
- **Firebase**, for user authentication and data persistence.

## App Features

- User registration and authentication through firebase
- Book searching by title
- Add books to collection (**Reading**, **Completed** and **Plan to Read** categories)
- Like books
- Set number of pages read
- See book info and rating (calculated by the likes of total app users)

## Book API

The app uses the [openlibrary book API](https://openlibrary.org/developers/api) for fetching book info and images.

## Setup Instructions

- In the `/web/src/common/firebaseConfigProperties.js` file, include valid firebase config keys.
- cd to `/web` folder.
- Run `npm install`.
- Build with `npm run build` command.
- For *dev server*, run `npm run dev`. Access app on localhost:8080.
