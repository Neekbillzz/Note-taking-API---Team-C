require("dotenv").config();

const express = require('express');
const handler = require('./routeHandler');

const app = express();
app.use(express.json());





// GET ALL NOTES SORTED BY TIME CREATED (NEWEST TO OLDEST)
app.get('/notes', handler.getAllNotes);



// CREATE A NEW DOCUMENT
app.post('/notes', handler.createNote);



// RETRIEVE ONLY ONE DOCUMENT
app.get('/notes/:id', handler.getOneNote );



// UPDATE AN EXISTING DOCUMENT
app.patch('/notes/:id', handler.updateNote); 




// GET ALL ARCHIVED NOTE, SORT BY ID
app.get('/archived', handler.allArchives);



// GET ALL ARCHIVED NOTES WITH THE SAME ID
app.get('/archived/:id', handler.getArchivedNoteById);



// DELETE NOTE FROM MEMORY(notes array)
app.delete('/notes/:id',handler.deleteNote );



// DELETE ARCHIVED NOTE WHERE ID = x AND VERSION = y FROM MEMORY(versionHistory array)
app.delete('/versionHistory/:id/:version', handler.deleteArchivedNote);


// DELETE ALL ARCHIVED NOTE WHERE ID =x FROM MEMORY
app.delete('/versionHistory/:id', handler.deleteArchivedById);



// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
  
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
  console.log(`server is running at port ${PORT}`);
});