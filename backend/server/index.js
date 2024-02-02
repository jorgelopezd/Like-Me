require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {createPosts, readPosts, eliminarPosts,modificarPosts} = require ('../utils/pg.js')

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_,res) =>{
    try{
        const result = await readPosts()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json(error)
    }
})

app.post('/posts', async (req, res) => {
    try{
        const result = await createPosts(req.body)
        res.status(201).json(result)
    }catch (error){
        res.status(500).json(error)
    }
})

app.delete("/posts/:id", async (req,res)=>{
    try{
        const { id } = req.params
        await eliminarPosts(id)
        res.status(204).json("post eliminados")
    }catch(error){
        res.status(500).json(error)
    }
})

app.put("/posts/like/:id", async (req,res)=> {
    try{
        const { id } = req.params
        await modificarPosts(id)
        res.status(200).json ("posts modificado")
    }catch(error){
        res.status(500).json(error)
    }
})


app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});


app.all('*', (_, res) =>
    res.status(201).json({ code: 201, message: 'Resource not found' })
)


module.exports = app

