const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);


let addNote = (title, body) => {
    let notes = [];
    let note = {
        title,
        body
    };

    /* load all the current notes */
    readFile("./notes-data.json", "utf-8").then(file => {
        if (file.length > 0) {
            let data = JSON.parse(file);
            for (let i = 0; i < data.length; i++) {
                if (data[i].title === title) {
                    console.log("Note with the same title already exists.");
                    return
                }
            }
            notes = data;
        }

        /* add note to notes-data.json file */
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
        console.log("Successfully added note");
    }).catch((err) => {
        console.log("Unable to read the file. Creating the file...");
        console.log("Error: " + err)
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
        console.log("Successfully added note");
    });
};

let getAll = () => {
    console.log("Getting all notes");
    readFile("./notes-data.json", "utf-8").then(file => {
        if (file.length > 0) {
            let data = JSON.parse(file);
            for (let i = 0; i < data.length; i++) {
                console.log("Title: " + data[i].title);
                console.log("Note: " + data[i].body);
            }
        }
    }).catch((err) => {
        console.log("An error encountered.");
        console.log("Error: " + err);
    });
};

let getNote = (title) => {
    console.log("Getting note with title: " + title);
    readFile("./notes-data.json", "utf-8").then(file => {
        if (file.length > 0) {
            let data = JSON.parse(file);
            for (let i = 0; i < data.length; i++) {
                if (data[i].title === title) {
                    console.log("Title: " + data[i].title);
                    console.log("Note: " + data[i].body);
                } else {
                    console.log("No note found with title: " + title);
                }
            }

        }
    }).catch((err) => {
        console.log("An error encountered.");
        console.log("Error: " + err);
    });
};

let removeNote = (title) => {
    let notes = [];
    console.log("Removing note with title: " + title);
    readFile("./notes-data.json", "utf-8").then(file => {
        if (file.length > 0) {
            let data = JSON.parse(file);
            data.forEach( (item) => {
                if (item.title === title) {
                    data.splice(item, 1);
                }
            });
            // for (let i = 0; i < data.length; i++) {
            //     console.log(data[i].title);
            //     if (data[i].title === title) {
            //         data[i].splice(i, 1);
            //         break;
            //     } else {
            //         console.log("No note found with title: " + title);
            //     }
            // }

            const truncate = promisify(fs.truncate);
            truncate('notes-data.json', 0).then( () => {
                console.log("Successfully cleared the file");
                if (data.length > 0) {
                    fs.writeFileSync('notes-data.json', JSON.stringify(data));
                    console.log("Successfully wrote to the file");
                }
            }).catch((err) => {
                console.log("Failed to clear the file.")
                console.log("Error: " + err)
            });
        } else {
            console.log("Failed to remove the note")
        }
        }).catch((err) => {
        console.log("An error encountered.");
        console.log("Error: " + err);
    });
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};

