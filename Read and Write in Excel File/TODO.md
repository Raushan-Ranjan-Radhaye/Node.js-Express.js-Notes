# TODO: Add CSRF Protection to Prevent Unauthorized Uploads

- [x] Update index.js to add express-session and csurf middleware for CSRF protection
- [x] Update views/excel.ejs to include CSRF token input in the form
- [ ] Test the app to ensure curl command fails without token and forms work with token
