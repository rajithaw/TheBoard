(function(notesController) {
    
    var data = require("../data");
    var auth = require("../auth");

    notesController.init = function (app) {
        app.get("/api/notes/:categoryName", 
            auth.ensureApiAuthenticated,
            function (req, res) {
                var categoryName = req.params.categoryName;

                data.getNotes(categoryName, function(err, notes) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.set("Content-Type", "application/json");
                        res.send(notes.notes);
                    }
                });
            });

        app.post("/api/notes/:categoryName", 
            auth.ensureApiAuthenticated,
            function (req, res) {
                var categoryName = req.params.categoryName;

                var noteToInsert = {
                    note: req.body.note,
                    color: req.body.color,
                    author: req.user.name
                };

                data.addNote(categoryName, noteToInsert, function (err) {
                    if (err) {
                        res.status(400).send("Failed to add note to data store");
                    } else {
                        res.set("Content-Type", "application/json");
                        res.status(201).send(noteToInsert);
                    }
                });
            });
    };
})(module.exports);