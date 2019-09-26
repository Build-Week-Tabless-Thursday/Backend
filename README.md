# Backend

## Proposal

### What problem does your app solve?

Organization. Make a like a to-do list for tabs.

### Be as specific as possible; how does your app solve the problem?

Allows you to store the url that you want to read.
Then add a description of what it is for.
This will reduce the amount open tabs needed.

This differs from bookmarking in:
Allows descriptions of tabs.
Syncs on the cloud and is not directly tied to the browser or platform.
Easier to delete or add tabs then the built in bookmarking systems in most browsers.
(Stretch) Allows you to specify which day the tab is for and bring up that tab on that specific day.

### What is the mission statement?

For the Tab-Hoarder in all of us

## Features

### What features are required for your minimum viable product?

Sign in.
Navigation on all pages.
CRUD operations for saving tabs.
Home Page
Category page

### What features do you wish to put in a future release?

Allow users to specify which day the tab is for and bring up that tab on that specific day.
Chrome Extension.
Sharing Categories.

### What do the top 3 similar apps do for their users?

OneTab - (Chrome Extension) Provides basic tab list and allows sharing list via URLs.
Toby - (Chrome Extension) Provides a drag and drop interface for managing tabs into groups and organizing tabs in a meaningful way.
Evernote - Allows users to stay more organized by putting all their notes in one easy to access place. Also allows for clipping off the web.

## Design - Planning

### What design system will you use?

Material Design

### What will your user flow be?

Sign in / Create an Account ->
-- Home Page with most Recent tabs ->
-- -- User taps on tab to open it
-- -- User taps add to add a tab
-- -- User taps nav to see categories and user switcher ->
-- -- -- User taps category to go to category page
-- -- -- User taps user account to sign out or edit

### What is the URL to your wireframes?

[Figma Wireframes](https://www.figma.com/file/FUkepkef8LqN01Eg7fjUK7/Design?node-id=0%3A1)

## Frameworks - Libraries

### What 3rd party frameworks/libraries are you considering using?

- Server: Node.js, Express, SQLite, JSON Web Token, Cors, Helmet, Kenex, Jest, Supertest
- Client: React,Axios, Materail-UI, React Anime, Babel, React Testing Library, Enzyme, Jest
- Web: Material Icons, Less

### Do APIs require you to contact its maintainer to gain access?

All of our APIs are internal.

### Are you required to pay to use the API?

No.

### Have you considered using Apple Frameworks? (MapKit, Healthkit, ARKit?)

N\A

## Target Audience

### Who is your target audience? Be specific.

Professional and Non-Professional users.
Those who don’t want to be locked into a single platform.
Anyone who has too many tabs and not enough space.

### What feedback have you gotten from potential users?

That they prefer bookmarks.

### Have you validated the problem and your solution with your target audience? How?

They wouldn't use it.

## Research

### Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday.

Prototype Key Feature(s)

- This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.

## Project & Features

### Register and Login

Users can register for a new account by providing a username, email, and password. The password is encrypted using bcrypt for added security. A user can then login with their username and password. When a user logs in or signs up for a new account, they are provided a token using JSONWebToken. This token is used to validate the user and allow them access to restricted information.

### Saving Tabs

Tabless Thursdays allows users to organize tabs into categories, and save them for later use. A URL and title is required to save a new tab to a user's profile. Adding a due date, notes, and category is optional. A screenshot will be created when a new tab is added, giving the user a preview of what the tab is referencing. A user can remove, edit, and add new tabs as much as they like. All of the tabs will be displayed on the user's dashboard.

### Account Management

Users can edit and delete their acccounts if they choose to. A user can change their username, email, and password.

### Data Management

All users and tabs are stored using PostgreSQL and Heroku. Users and tabs models are tested to ensure they function properly.
