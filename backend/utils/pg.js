require('dotenv').config()
const {Pool} = require('pg')

const config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG-DatabaseError,
    allowExitOnIdle: tru
}

console.log(config)

const pool = new Pool(config)

const readPosts = async () => {
    const result = await pool.query('SELECT * FROM posts;')
    return result.rows
}

const createPost = async (id,titulo,url,description) => {
    const query = 'INSERT INTO posts (id,titulo,img,descripcion) values ($1, $2, $3, $4);'
    const values = [id,titulo,url,description]
    const result = await pool.query(query, values)
    console.log(result.rows)
    return result.rows
}

createPost('8','titulo 1','www.google.cl','prueba')

module.exports = {readPosts,createPost}