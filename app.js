require("dotenv").config();

const express = require('express');
const handler = require('./routeHandler');
const app = express();

//parse json body
app.use(express.json());



// RETRIEVE ALL RECORDS. SORT BY DATE (NEWEST TO OLDEST)
app.get('/notes', handler.getAllNotes);


// CREATE NEW RECORD
app.post('/notes', handler.createNote);


// RETRIEVE ONE RECORD
app.get('/notes/:id', handler.getOneNote );


// UPDATE RECORD
app.patch('/notes/:id', handler.updateNote); 


// RETRIVE ALL ARCHIVED RECORDS. SORT BY ID
app.get('/archived', handler.allArchives);


// RETRIEVE ALL ARCHIVED RECORDS WHERE ID = x
app.get('/archived/:id', handler.getArchivedNoteById);


// DELETE RECORD
app.delete('/notes/:id',handler.deleteNote );


// DELETE ARCHIVED RECORD, WHERE ID = x AND VERSION = y
app.delete('/versionHistory/:id/:version', handler.deleteArchivedNote);


// DELETE ALL ARCHIVED RECORDS, WHERE ID = x 
app.delete('/versionHistory/:id', handler.deleteArchivedById);


// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
  
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
  console.log(`server is running at port ${PORT}`);

});
