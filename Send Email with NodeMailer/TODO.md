# TODO List for Fixing "Cannot POST /send-email" Error and Email Authentication

## Tasks
- [x] Update the route in `index.js` from `/sendmail` to `/send-email` to match the form action.
- [x] Fix the typo in `views/mailpage.ejs` from "Messgae" to "Message".
- [x] Test the server to ensure the email sending works correctly.
- [x] Fix Gmail SMTP authentication error (EAUTH: Username and Password not accepted).
- [x] Update code to use environment variables for email credentials.
- [x] Guide user to generate a new Gmail app password if needed.
