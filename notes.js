//console.log('Hello')
const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'hello how are you?'
}
const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added!')
    } else {
        console.log('Note Title Taken!')
    }

}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const keep = notes.filter((note) => note.title !== title)
    if (notes.length > keep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(keep)
    }
    else {
        console.log(chalk.red.inverse('No Note Found'))
    }

}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('YOUR NOTES!!'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red.inverse('NO NOTE FOUND'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
