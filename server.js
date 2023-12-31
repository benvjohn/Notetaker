const express = require('express');
const path = require('path');
const fs = require('fs')
//const api = require('./routes/index.js');
const db = require('./db/db.json')
const PORT = process.env.PORT||3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));
app.get('/api/notes',(req,res)=>{
  res.json(db)
})
app.post("/api/notes",(req,res)=>{
  const newNote = req.body
  newNote.id = Math.random()
  console.log(newNote)
  db.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(db))
  res.json(db)
})
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
