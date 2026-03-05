//This array will contain all the notes created by a user
let notes = [{
    id: 1,
    title: 'First Class',
    content: 'Intro to Backend',
    createdAt: '2025-03-07T17:00:00Z',
    version: 1
  },
  {
    id: 2,
    title: 'Second Class',
    content: 'Node js and Express',
    createdAt: '2025-03-14T17:15:00Z',
    version: 1
  }
  ];



//========versionHistory Array===============

let versionHistory = [{
    id: 1,
    title: 'First Class',
    content: 'Intro to Backend',
    createdAt: '2025-03-07T17:00:00Z',
    version: 1
  },
  {
    id: 2,
    title: 'Second Class',
    content: 'Node js and Express',
    createdAt: '2025-03-14T17:15:00Z',
    version: 1
  }
  ];




//=========getAllNote=================================

const getAllNotes =  (req, res) =>{
  const sortByTime = [...notes].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.status(200).json(sortByTime);
};



//===========createNote==============================

let assignId = 3; // Initialised at 3 because 2 records already exist in the "notes" array


const createNote = (req, res) =>{
  const newNote = {
    id: assignId,
    title: req.body.title || 'Untitle Document',
    content: req.body.content || 'Write you notes here.',
    createdAt: new Date().toISOString(),
    version: 1 
  };

  assignId++; // increment id by 1
  notes.push(newNote);
  return res.status(201).json(newNote);
};




//========getOneNote===============================

const getOneNote = (req, res) =>{
  const noteId = parseInt(req.params.id);
  const retrieveNote = notes.find(note => note.id === noteId);
  
  if(!retrieveNote){
    return res.status(404).json({error: 'DOCUMENT NOT FOUND'});
  }
  return res.status(200).json(retrieveNote);
};



//================updateNote=======================

const updateNote = (req, res) =>{ 

  const noteId = parseInt(req.params.id);
  const noteToUpdate = notes.find(note => note.id === noteId);

  if(!noteToUpdate){
    return res.status(404).json({error: 'Document not found'});
  };

  versionHistory.push({...noteToUpdate, archiveAt: new Date().toISOString()}); // Retain the original note and records its archival date
  noteToUpdate.version++; // increment version number

  const {id, version, ...updates} = req.body; // Removes id and version fields from the remaining request body

  Object.assign(noteToUpdate, updates); // Merge the changes back into the note object
  noteToUpdate.updatedAt = new Date().toISOString();
   

  return res.status(200).json(noteToUpdate);

};

//==============getAllArchivedNotes==============================

const allArchives = (req, res) =>{
    const sortById = [...versionHistory].sort((a,b) =>{
        if (a.id !== b.id){
            return a.id - b.id;
        };
        return a.version - b.version;
    });

    return res.status(200).json(sortById);
};




//===========Get ARCHIVED NOTE (WHERE ID = x) ===================

const getArchivedNoteById = (req, res) =>{
    const noteId = parseInt(req.params.id);
    const notesById = versionHistory.filter(vh => vh.id === noteId); // Return all archives where id = noteId
   
    if(notesById.length === 0 ){
        return res.status(404).json( {error: 'ARCHIVES NOT FOUND'}); // Bad request
    };

    const sortByVersion = [...notesById].sort((a,b) => a.version - b.version); // Sort achives by version number (Ascending order)

    return res.status(200).json(sortByVersion); // Send note archives, sorted by version number

};



//==============deleteNote==============================

const deleteNote = (req, res) =>{
  const noteId = parseInt(req.params.id);
  const initialLength = notes.length;
  notes = notes.filter(nt => nt.id !== noteId);

  if(notes.length === initialLength){
    return res.status(404).json({ error: 'NOT FOUND' });
  };
   res.status(204).send(); // Silent success

};



//==============delete  Archived Note (WHERE ID = x AND VERSION = y )========================

const deleteArchivedNote = (req, res) =>{
  const noteId = parseInt(req.params.id);
  const versionNumber = parseInt(req.params.version);
  const initialLength = versionHistory.length;
  versionHistory = versionHistory.filter(vh => vh.id !== noteId || vh.version !== versionNumber);

  if(versionHistory.length === initialLength){
    return res.status(404).json({ error: 'ARCHIVE NOT FOUND' });
  };
   res.status(204).send(); // Silent success
};

//==============DELETE ALL ARCHIVED NOTES WHERE ID = x ========================

const deleteArchivedById = (req,res) =>{
  const noteId = parseInt(req.params.id);
  const initialLength = versionHistory.length;
  versionHistory = versionHistory.filter(vh => vh.id !== noteId );

  if(versionHistory.length === initialLength){
    return res.status(404).json({ error: 'ARCHIVE NOT FOUND' });
  };

  res.status(204).send(); // Silent success
};

module.exports = {
    getAllNotes,
    createNote,
    getOneNote,
    updateNote,
    allArchives,
    getArchivedNoteById,
    deleteNote,
    deleteArchivedNote,
    deleteArchivedById

};


