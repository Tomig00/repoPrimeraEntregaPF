const { Console } = require("console")
const res = require("express/lib/response")
const fs = require("fs")

class Contenedor{

    save(producto){
        let arregloOld = []
        let idMayor = 0
        let tiempo = Date()
        if (fs.readFileSync("./productos.txt", "utf-8") !== ""){
            arregloOld = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"))
        }

        for (let i = 0; i < arregloOld.length; i++)
        {
            if (arregloOld[i].id > idMayor)
            {
                idMayor = arregloOld[i].id
            }else break
        }
        producto.id = idMayor + 1
        producto.timestamp = tiempo.toString()
        arregloOld.push(producto)

        let productoJSON = JSON.stringify(arregloOld)
        fs.writeFile('./productos.txt', productoJSON, error =>{
            if (error){
                console.log(error)
            }else{
                console.log("Producto agregado correctamente.")
            }
        })
        return producto.id
    }

    getById(id){
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    encontrado = null
                                    resolve(encontrado)
                                }else if (encontro === 1)
                                {
                                    resolve(encontrado)
                                }
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    getAll()
    {
        let arregloOld = []

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                resolve(arregloOld)
                            }
                        })
                    }, 1000
                );
            }
        );
        return promesa
         
    }

    changeById(id, producto)
    {
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]

                                        arregloOld.splice(i, 1)
                                        producto.id = id
                                        arregloOld.push(producto)

                                    }
                                }
                                let productoJSON = JSON.stringify(arregloOld)
                                fs.writeFile('./productos.txt', productoJSON, error =>{
                                    if (error){
                                        console.log(error)
                                    }else{
                                        console.log("Producto actualizado correctamente.")
                                    }
                                })
                                resolve(arregloOld)
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    deleteById(id)
    {
        let arregloOld = []
        let encontro = 0
        let objeto

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                if (!id || typeof id !== `number`)
                                {
                                    resolve("El Id ingresado no es un numero") 
                                }
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        objeto = i
                                        arregloOld.splice(objeto, 1);
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    resolve("No existe objeto con el Id ingresado.")
                                }
                                fs.writeFile("./productos.txt",JSON.stringify(arregloOld), error => {
                                    if (error){
                                        reject(error)
                                    }else {
                                        resolve(`Se borro objeto con id: ${id}`)
                                    }
                                })  
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }
}

class ContenedorCarrito{

    crear(carrito){
        let arregloOld = []
        
        let idMayor = 0
        let time = Date()

        if (fs.readFileSync("./carrito.txt", "utf-8") !== ""){
            arregloOld = JSON.parse(fs.readFileSync("./carrito.txt", "utf-8"))
        }

        for (let i = 0; i < arregloOld.length; i++)
        {
            if (arregloOld[i].id > idMayor)
            {
                idMayor = arregloOld[i].id
            }else break
        }
        carrito.id = idMayor + 1
        carrito.timestamp = time.toString()
        carrito.producto = []
        arregloOld.push(carrito)

        let carritoJSON = JSON.stringify(arregloOld)
        fs.writeFile('./carrito.txt', carritoJSON, error =>{
            if (error){
                console.log(error)
            }else{
                console.log("Carrito creado correctamente.")
            }
        })
        return carrito.id
    }

    getById(id){
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./carrito.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    encontrado = null
                                    resolve(encontrado)
                                }else if (encontro === 1)
                                {
                                    resolve(encontrado.producto)
                                }
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    getByIdProducto(id){
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    encontrado = null
                                    resolve(encontrado)
                                }else if (encontro === 1)
                                {
                                    resolve(encontrado)
                                }
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }


    getAll()
    {
        let arregloOld = []

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                resolve(arregloOld)
                            }
                        })
                    }, 1000
                );
            }
        );
        return promesa
         
    }

    addProducto(producto)
    {
        let arregloOld = []


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./carrito.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                

                                let ultimaPosicion = arregloOld.length
                                let ultimoProducto = arregloOld[ultimaPosicion-1]
                                
                                ultimoProducto.producto.push(producto)  

                                let productoJSON = JSON.stringify(arregloOld)
                                fs.writeFile('./carrito.txt', productoJSON, error =>{
                                    if (error){
                                        console.log(error)
                                    }else{
                                        console.log("Carrito actualizado correctamente.")
                                    }
                                })
                                resolve(arregloOld)
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    deleteById(id)
    {
        let arregloOld = []
        let encontro = 0
        let objeto

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./carrito.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                if (!id || typeof id !== `number`)
                                {
                                    resolve("El Id ingresado no es un numero") 
                                }
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        objeto = i
                                        arregloOld.splice(objeto, 1);
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    resolve("No existe objeto con el Id ingresado.")
                                }
                                fs.writeFile("./carrito.txt",JSON.stringify(arregloOld), error => {
                                    if (error){
                                        reject(error)
                                    }else {
                                        resolve(`Se borro carrito con id: ${id}`)
                                    }
                                })  
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    delteProductoById(idCarrito,idProducto)
    {
        let carrito = []
        let producto = []
        let encontroCarrito = 0
        let encontroProducto = 0


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./carrito.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                carrito = JSON.parse(contenido)
                                
                                for (let i = 0; i < carrito.length; i++)
                                {
                                    if (carrito[i].id === idCarrito)
                                    {
                                        encontroCarrito = 1
                                        producto = carrito[i].producto
                                        for (let j = 0; j < producto.length; j++) 
                                        {
                                           if (producto[j].id === idProducto)
                                            {
                                                encontroProducto = 1
                                                producto.splice(j,1)
                                            }
                                        }
                                        if(encontroProducto === 0)
                                        {
                                            reject("Producto no encontrado")
                                        }
                                        carrito[i].producto = producto
                                    }
                                }

                                if(encontroCarrito === 0)
                                {
                                    reject("Carrito no encontrado")
                                }
                                 

                                let productoJSON = JSON.stringify(carrito)
                                fs.writeFile('./carrito.txt', productoJSON, error =>{
                                    if (error){
                                        console.log(error)
                                    }else{
                                        console.log("Carrito actualizado correctamente.")
                                    }
                                })
                                resolve(carrito)
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

}

module.exports = {Contenedor, ContenedorCarrito}
