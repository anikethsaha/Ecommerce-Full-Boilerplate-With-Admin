<p align="center">

  <img alt="efba logo" src="https://i.imgur.com/CS05H7T.png" width="150px" />
</p>
<h2 align="center">:zap: Ecommerce-Full-Boilerplate-With-Admin :zap:</h2>
<p align="center">
   <a href="https://travis-ci.org/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/branches">
    <img alt="badgeprs" src="https://travis-ci.org/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin.svg?branch=master" />
  </a>
  <a href="https://gitter.im/Ecommerce-Full-Boilerplate-With-Admin/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img alt="badgeprs" src="https://badges.gitter.im/Ecommerce-Full-Boilerplate-With-Admin/community.svg" />
  </a>
  <a href="https://dependabot.com/">
    <img alt="badgeprs" src="https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="badgeprs" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <img alt="badgeprs" src="https://img.shields.io/badge/PRs-Welcome-green.svg" />
</p>



<p align="center">
  This is Full Working E commerce Site ( Boilerplate and Configuration Enabled ) With Admin Page Integrated
</p>
<br><br>



> ## Still not stable for production  :warning:

## Contents
- [Live Demo](#live-demo-tv)
- [Features](#features-tada)
- [Todo(s)](#todo-pencil)
- [Installation](#installation-hammer)
  - [For Main Ecommerce site](#for-main-ecommerce-site)
  - [For Admin Site](#for-admin-site)
- [Editing](#editing-scissors)
- [Road To Awesome Releases](#road-to-awesome-releases-newspaper)
- [LICENSE](#license-bookmark)








## Live Demo :tv:
#### Click [here](https://gentle-eyrie-53138.herokuapp.com/) to see live demo . 
#### Click [here](https://immense-refuge-43321.herokuapp.com/login) to see the admin site live demo 


## FEATURES :tada:
- [x] Authentication with OAuth
- [x] Live Search
- [x] Cart
- [x] Checkout Item Changing
- [x] Instant Buy
- [x] Payment with [razorpay](https://razorpay.com/)
- [x] Live Chat using [tawk.io](https://www.tawk.to)
- [x] Password reset using mail ( using nodemailer )
- [x] Contact us form
- [x] Categories With Subcategories
- [x] Dynamic Content
- [x] Newsletter
- [x] Admin Panel






## TODO :pencil:
- [ ] Location Based Product Searching :  [Discussion](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/issues/2)
- [ ] Tests
- [ ] Recommendation System :  [Discussion](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/issues/4)
- [ ] Admin Panel - analytics system for sales and visitors
- [ ] Product Review Panel







## TECHNOLOGY :computer:
- NodeJS - Server
- ExpressJS - Nodejs framework
- MongoDB - Database
- HTML, CSS, JS, EJS - Frontend
- PM2 - Clustering
- Firebase - Firestore for Session Storage





## INSTALLATION :hammer:

* Clone the repo
* Check the `editing_Guide.txt` for editing refs
* `$ npm install`

### For Main Ecommerce site
* `$ npm i -g nodemon`
* `$ nodemon server` to run the server in local development
* `$ npm run start` to run the server in production

### For Admin Site
* `$ cd Admin_Site`
* `$ npm i -g nodemon`
* `$ nodemon server` to run the server in local development
* `$ npm run start` to run the server in production







## EDITING :scissors:
Please go through the `configs` folder to edit the configuration , APIs and .env variables
* `$ cd configs` for main site configs editing
* `$ cd Admin_Site` and then in `config.js` change the values
* Refer [EDITING_GUIDE](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/blob/master/EDITING_GUIDE.md) for more editing details







## Road To Awesome Releases :newspaper:
**Suggestions Are Welcome**

### First Major - v1
- To address all the issues with label `v1` **[Check Here](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/issues?q=is%3Aissue+is%3Aopen+label%3Av1)**
- Tests for most of the modules
- Better **Live Demo** [Issue#14](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/issues/14)


### v2
- Better Docs
- Recommendation System

**Few more are there but quite not sure about them, will add it here if required**

### v3
- Migration to **Typescript**
- Frontend in **React**
- Query Using **Graphql**

**More To Come**






## LICENSE :bookmark:

MIT License

Copyright (c) 2019 Aniketh Saha

Use It As You Want :smiley:

Refer for more info [LICENSE](https://github.com/anikethsaha/Ecommerce-Full-Boilerplate-With-Admin/blob/master/LICENSE)
