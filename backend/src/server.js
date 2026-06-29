import app from './app.js'

const port = 3000

<<<<<<< HEAD
app.listen(port, () => {
    console.log(`O servidor esta rodando na porta: https://localhost:${port}`)
=======
app.listen(port,"0.0.0.0", () => {
    console.log(`O servidor esta rodando na porta: ${port}`)
>>>>>>> main
})