import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        console.log('constructor')
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        const data = this.#database[table] ?? []
        return data
    }

    insert(table, data){

        console.log('inser')
        if (Array.isArray(this.#database[table])){
            console.log('if')
            this.#database[table].push(data)
        }else{
            console.log('else')
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }
}