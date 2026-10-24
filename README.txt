FOUND-ARK — OFFLINE MULTI-FILE REACT PROJECT

Files:
- index.html: entry page; open this file in a browser.
- styles.css: application styling.
- app.js: React application component and initial render.
- builder.js: builder interactions and behavior.
- vendor/react.production.min.js: local React runtime.
- vendor/react-dom.production.min.js: local ReactDOM runtime.

HOW TO RUN
1. Extract the whole ZIP to a folder.
2. Keep the folder structure and all files together.
3. Open index.html in a modern browser.

No Node.js, npm install, or internet connection is required for this offline version.
Do not open app.js by itself. Open index.html. The vendor runtime is React 16, so this
is a browser-ready React project, not a Vite/npm development project. Browser testing
of every feature has not been performed.


NEW FEATURES
- Select an Image or Video element, then use the Properties panel's Image / Video section to set a media URL or choose a file from your device. Width and Height are editable using values such as 320px, 100%, or auto.
- Sign up and login use only a username and password. This is a local demo account system stored in this browser only, not secure production authentication. Do not use a real/reused password.
- Uploaded media is converted to a data URL for the current page/project, which can make exported code larger for big videos.
