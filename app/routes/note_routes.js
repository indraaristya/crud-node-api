const Note = require('../models/note_models.js');

module.exports = function(app, db) {
    //add notes to db
    app.post('/notes', (req, res) => {
        if (!req.body.content || !req.body.title) {
            return res.status(400).send({
                message: "Note Title/Content cannot be empty"
            });
        }

        Note.find()
        .then(notes => {
            for (note in notes) {
                if (notes[note].title == req.body.title) {
                    res.send({
                        message: "Same Title already in DB"
                    });
                }
            }
        });
        const note = new Note({
            title: req.body.title || "Untitled",
            content: req.body.content
        });

        note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error"
            });
        });
        
    });

    //get all notes in db
    app.get('/notes', (req, res) => {
        Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error when retrieving notes in db"
            });
        });
    });

    //get note by id
    app.get('/note/:id', (req, res) => {
        Note.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id "+req.params.id
                });
            }
            res.send(note)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id "+req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id "+req.params.id
            });
        });
    });

    //get note by title
    app.get('/note', (req, res) => {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        Note.find()
        .then(notes => {
            for (note in notes) {
                if (notes[note].title == req.body.title) {
                    res.send(notes[note]);
                }
            }
            res.status(400).send({
                message: "No Note"
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error when retrieving notes in db"
            });
        });
    });

    //update the note by id
    app.post('/update', (req, res) => {
        if (!req.body.content) {
            return res.status(400).send({
                message: "Note content cannot be empty"
            });
        }

        Note.findByIdAndUpdate(req.body.id, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, {new: true})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.body.id
            });
        });
    });

    //update the note by title
    app.post('/update', (req, res) => {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Note content cannot be empty"
            });
        }

        Note.findByIdAndUpdate(req.body.id, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, {new: true})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.body.id
            });
        });
    });

    //delete a note
    app.get('/delete', (req, res) => {
        Note.findByIdAndRemove(req.body.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            res.send({
                message: "Note deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id "+req.body.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.body.id
            });
        });
    });
};