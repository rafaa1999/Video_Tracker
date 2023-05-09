# Video Tracker Application

This is a full-stack video tracker application built using Vanilla JavaScript for the client-side and Node.js for the backend, with Mongoose as the ORM for database operations. The application uses Bootstrap for styling and DOM manipulation for user interactions. The application distinguishes between the admin part and the client-side part.

## Table of Contents

-   [Installation](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#installation)
-   [Usage](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#usage)
-   [Features](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#features)
-   [Technologies Used](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#technologies-used)
-   [Contributing](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#contributing)
-   [License](https://chat.openai.com/c/f6c4df29-577b-451d-bd4e-db935ebcdad3#license)

## Installation

To install the project, follow these steps:

1.  Clone the repository to your local machine using `git clone https://github.com/yourusername/video-tracker.git`
2.  Navigate to the project directory using `cd video-tracker`
3.  Install the required dependencies using `npm install`
4.  Start the Node.js server using `npm start`
5.  Open a web browser and navigate to `http://localhost:3000`

## Usage

The video tracker application allows users to:

-   View a list of videos
-   Edit an existing video in the list (admin only)
-   Delete a video from the list (admin only)
-   Add a new video to the list (client-side only)
-   Vote for a video (client-side only)
-   Seach for a video (client-side only)
-   Filter videos (client-side only)
-   Sort videos (client-side only)

The admin can access the admin part of the application by logging in with a password. The client-side part is accessible to all users.

## Features

The video tracker application has the following features:

-   Authentication for the admin part of the application
-   CRUD operations for managing videos (admin only)
-   Voting videos (client-side only)
-   Responsive design using Bootstrap
-   DOM manipulation for user interactions

## Technologies Used

The following technologies were used in the creation of this project:

-   Vanilla JavaScript
-   Node.js
-   Mongoose
-   Bootstrap
-   DOM manipulation

## Contributing

If you'd like to contribute to this project, please create a pull request with your changes. Be sure to include a detailed description of your changes and the problem they solve.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
