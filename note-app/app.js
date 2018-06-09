const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

const argv = require('yargs')
    .alias('a', 'add')
    .describe('a', 'Add a note')
    .alias('l', 'list')
    .describe('l', 'list notes')
    .alias('r', 'read')
    .describe('r', 'read a note')
    .alias('d', 'delete')
    .describe('d', 'delete a note')
    .alias('t', 'title')
    .describe('', 'title for the note')
    .alias('b', 'body')
    .describe('b', 'note content')
    //.demandCommand(1, minMsg = 'At least one command is required')
    //.demandOption(['t'], msg='Title required')
    .argv;


if (argv.a) {
    notes.addNote(argv.t, argv.b);
} else if (argv.l) {
    notes.getAll();
} else if (argv.r) {
    notes.getNote(argv.t);
} else if (argv.d) {
    notes.removeNote(argv.t);
} else {
    console.log("Command not found.")
}

