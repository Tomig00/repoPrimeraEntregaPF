const express = require('express')
const {ContenedorCarrito} = require('../api')
const routerCarrito = express.Router()

let carrito = new Object()
routerCarrito.post('/', function(req, res){
    const test = new ContenedorCarrito()

    carrito.title = req.body.title

    let id = test.crear(carrito)
    console.log(`carritoAgregadoConId: ${id}`)
    res.json({carritoAgregadoConId: `${id}`})
}
);

routerCarrito.delete('/:id', function(req, res){
    const num = req.params.id
    const test = new ContenedorCarrito()
    let id = parseInt(num)

    test.deleteById(id).then(function(result) {
        res.end(`<h1 style = 'color:blue;'> CARRITO ELIMINADO</h1>${JSON.stringify(result)}`)
    })
    console.log(`carritoBorrado`)
}
);

routerCarrito.get('/:id/productos', function(req, res){
    const num = req.params.id
            if (isNaN(num))
            {
                res.json({ error : 'El parametro no es un numero entero' })
            }else{
                id = parseInt(num)
            const test = new ContenedorCarrito()
        
            test.getById(id).then(function(result) {
                if (result === null)
                {
                    res.json({ error : 'carrito no encontrado' })
                }else
                {
                    res.end(`<h1 style = 'color:blue;'> PRODUCTOS EN EL CARRITO</h1>${JSON.stringify(result)}`)
                }
            });
            } 
}
);


routerCarrito.post('/:id/productos', function(req, res){

    const num = req.params.id
            if (isNaN(num))
            {
                res.json({ error : 'el parametro no es un numero' })
            }else{
                id = parseInt(num)
            const test = new ContenedorCarrito()
        
            test.getByIdProducto(id).then(function(result) 
            {
                if (result === null)
                {
                    res.json({ error : 'producto no encontrado' })
                }else
                {
                    test.addProducto(result).then(function(resultFin) {
                        res.json({resultFin})
                    });
                }
            });
            
    } 
}
);


routerCarrito.delete('/:id/productos/:id_prod', function(req, res){
    const num = req.params.id
    const Num = req.params.id_prod

    if (isNaN(num))
    {
        res.json({ error : 'el parametro no es un numero' })
    }
    else
    {
        id = parseInt(num)
        const test = new ContenedorCarrito()

    
            idCarrito = parseInt(num)
            idProd = parseInt(Num)
            test.delteProductoById(idCarrito,idProd).then(function(resultFin) {
                res.json({resultFin})
            })
            .catch(function(resultError){res.json({resultError})});
            console.log(`Producto de carrito borrado`)
        
    }
    
}
);

module.exports = routerCarrito