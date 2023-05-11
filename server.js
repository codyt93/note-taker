const express = require('express');
const path = require('path');

const fs = require('fs')
const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage


// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get("/api/notes", (req, res) =>{
  fs.readFile("./db/db.json","utf-8",(error,data)=>{
    res.send(data)
  })  
})
app.post("/api/notes", (req, res) =>{
    fs.readFile("./db/db.json","utf-8",(error,data)=>{
        const notes = JSON.parse(data)
        notes.push(req.body)
        fs.writeFile("./db/db.json",JSON.stringify(notes),(error,data)=>{
            res.json(data)
          })  
    })  
  })
// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
