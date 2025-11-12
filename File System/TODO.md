# TODO List for Fixing PDF Read Error

## Steps to Complete:

- [ ] Edit `index.js`: Replace `fs.read('./public/data.pdf', ...)` with `fs.readFile('./public/data.pdf', ...)` in the `/read-pdf` route to correctly read the binary PDF file.
- [ ] Restart the server if it's currently running (e.g., stop and run `node index.js` again).
- [ ] Test the `/read-pdf` endpoint by accessing `http://localhost:3000/read-pdf` in a browser to confirm the PDF is served without errors.
