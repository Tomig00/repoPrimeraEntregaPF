const express = require('express')
const Contenedor = require('../api')
const res = require('express/lib/response')

const routerAdmin = express.Router()

let producto = new Object()

routerAdmin.get('/:id', (req, res) => {   
    const num = req.params.id
    const test = new Contenedor()
    if (num === "all")
    {
        test.getAll().then(function(result){
            res.end(`<h1 style = 'color:blue;'> ARRAY DE PRODUCTOS</h1>${JSON.stringify(result)}`)
        });
        
    }else{
        id = parseInt(num)
    

        test.getById(id).then(function(result) {
            if (result === null)
            {
                res.json({ error : 'producto no encontrado' })
            }else
            {
                res.end(`<h1 style = 'color:blue;'> PRODUCTO POR ID</h1>${JSON.stringify(result)}`)
            }
    });
    } 
})


// routerAdmin.post('/', function(req, res, next){

//     if (req.query.admin == 1){
//         console.log("Se conecto un admin")
        
//         next()
//     }else {
//         res.send({ error: "No se logeo como admin"})
//     }
// }, (req, res) => { 
//     const test = new Contenedor()
//     console.log(req.body.title)
//         producto.title = req.body.title
//         producto.price = req.body.price
//         producto.thumbnail = req.body.thumbnail
        
//         console.log(producto)
//         let id = test.save(producto)
//         res.json({productoAgregadoConId: `${id}`})
//     }
// );


// routerAdmin.put('/:id', function(req, res, next){

//     if (req.query.admin == 1){
//         console.log("Se conecto un admin")
        
//         next()
//     }else {
//         res.send({ error: "No se logeo como admin"})
//     }
// }, (req, res) => { 
//         const num = req.params.id
//         let id = parseInt(num)
//         let test = new Contenedor();
//         producto.title = req.body.title
//         producto.price = req.body.price
//         producto.thumbnail = req.body.thumbnail
        
//         test.changeById(id, producto).then(function(result) {
//             res.json({result})
//         }); 
//     }
// );

// routerAdmin.delete('/:id', function(req, res, next){

//     if (req.query.admin == 1){
//         console.log("Se conecto un admin")
        
//         next()
//     }else {
//         res.send({ error: "No se logeo como admin"})
//     }
// }, (req, res) => { 
//         const num = req.params.id
//         let id = parseInt(num)
//         let test = new Contenedor();
//         test.deleteById(id).then(function(result) {
//             res.end(`<h1 style = 'color:blue;'> PRODUCTO ELIMINADO</h1>${JSON.stringify(result)}`)
//         }); 
//     }
// );

module.exports = routerAdmin
