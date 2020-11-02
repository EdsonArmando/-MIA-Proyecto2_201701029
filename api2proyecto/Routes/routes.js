const { Router } = require('express');
const router = Router();
const { mail } = require('../Email/email');
const BD = require('../Config/configdb');
router.get('/', async (req, res) => {
    res.json('Hola Mundo');
})
//Get Paises
router.get('/getPaises', async (req, res) => {
  sql = " select *from pais ";

  let result = await BD.Open(sql, [], false);
  var Users = [];

  result.rows.map(user => {
    let userSchema = {
      "idPais": user[0],
      "nombre": user[1],
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//GetUsuario
router.get('/getCategorias', async (req, res) => {
    sql = " select *from categoria ";

    let result = await BD.Open(sql, [], false);
    var Users = [];

    result.rows.map(user => {
        let userSchema = {
            "codido": user[0],
            "nombre": user[1],
        }
        Users.push(userSchema);
    })
    var jsonString = JSON.stringify(Users);
    res.json(Users);
})
//GetUsuario
router.get('/getProducto', async (req, res) => {
  sql = "(select producto.idproducto,producto.nombre,producto.detalleproducto,producto.foto,producto.idcategoria,producto.precio, categoria.nombre as NombreCategoria, usuario.nombre from categoria, producto,usuario" +
    " where producto.idcategoria = categoria.idcategoria and producto.idUsuario = usuario.idUsuario)";

  let result = await BD.Open(sql, [], false);
  var Users = [];

  result.rows.map(data => {
    let userSchema = {
      "id": data[0],
      "categoria": data[6],
      "urlImage": data[3],
      "descripcion": data[2],
      "price": data[5],
      "idUsuario": data[7],
      "idCategoria": data[4],
      "name": data[1],
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//get Product
router.put('/oneProduct',async (req,res)=>{
  const { id } = req.body;
  sql = "(select producto.idproducto,producto.nombre,producto.detalleproducto,producto.foto,producto.idcategoria,producto.precio, categoria.nombre as NombreCategoria, usuario.nombre,producto.idUsuario from categoria, producto,usuario" +
    " where producto.idcategoria = categoria.idcategoria and producto.idUsuario = usuario.idUsuario and producto.idProducto = :id)";
  let result = await BD.Open(sql, [id], true);
  var Users = [];
  result.rows.map(data => {
    let userSchema = {
      "id": data[0],
      "categoria": data[6],
      "urlImage": data[3],
      "descripcion": data[2],
      "price": data[5],
      "idUsuario": data[7],
      "idUserProducto": data[8],
      "idCategoria": data[4],
      "name": data[1],
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//Login
router.put('/Login',async (req,res)=>{
    const { username,contrasenia } = req.body;
    sql = "Select * from usuario where usuario.nombre =: username and usuario.contrasenia =: contrasenia and usuario.estado = '1'";
    let result = await BD.Open(sql, [username, contrasenia], true);
    var Users = [];
    result.rows.map(user => {
        let userSchema = {
            "NOMBRE": user[2],
            "CONTRASENIA": user[5],
        }
        Users.push(userSchema);
    })
    var jsonString = JSON.stringify(Users);
    res.json(Users);
})
//Create User
router.post('/CreateUser',async (req,res)=>{
    const { idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,pais,creditos,foto,estado } = req.body;
    sql = "insert into Usuario(idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,idPais,creditos,foto,estado)" +
        "values (:idTipo,:nombre,:apellido,:correo,:contrasenia,:fechaNacimiento,:pais,:creditos,:foto,:estado)";
    await BD.Open(sql, [idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,pais,creditos,foto,estado], true);
    res.status(200).json({
        "Nombre": nombre,
        "Apellido": apellido,
        "correo": correo
    })
    mail('edsonguix@gmail.com',nombre);
})
//Create Producto
router.post('/CreateProducto',async (req,res)=>{
  console.log(req.body);
  const { nombre,foto,precio,detalleProducto,idCategoria,idUsuario } = req.body;
  sql = "insert into Producto(nombre,detalleProducto,precio,idCategoria,foto,idUsuario)" +
    "values (:nombre,:detalleProducto,:precio,:idCategoria,:foto,:idUsuario)";
  await BD.Open(sql, [nombre,detalleProducto,precio,idCategoria,foto, idUsuario], true);
  res.status(200).json({
    "Producto": nombre,
    "Precio": precio,
    "detalleProducto": detalleProducto
  })
})
//create Categoria
router.post('/insertCategoria',async (req,res)=>{
  const { nombre } = req.body;
  sql = "insert into Categoria(nombre)" +
    "values (:nombre)";
  await BD.Open(sql, [nombre], true);
  res.status(200).json({
    "Nombre": nombre
  })
})
//Validar Cuenta
//Login
router.get('/Validate/:nombre',async (req,res)=>{
    var nombreUsuario = req.params.nombre;
    sql = "update usuario set usuario.estado = '1' where usuario.nombre = :nombreUsuario";
    await BD.Open(sql, [nombreUsuario], true);
    res.json('Cuenta valida');
})
//getId
router.put('/getId',async (req,res)=>{
  const { username } = req.body;
  sql = "Select usuario.idUsuario from usuario where usuario.nombre =: username";
  let result = await BD.Open(sql, [username], true);
  var Users = [];
  result.rows.map(user => {
    let userSchema = {
      "idUsuario": user[0],
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
});
//getId
router.put('/getUser',async (req,res)=>{
  const { id } = req.body;
  console.log(req.body);
  sql = "Select * from usuario where usuario.idUsuario =: id";
  let result = await BD.Open(sql, [id], true);
  var Users = [];
  result.rows.map(user => {
    let userSchema = {
      "idUsuario": user[0],
      "idTipo": user[1],
      "nombre": user[2],
      "apellido": user[3],
      "correo": user[4],
      "contrasenia": user[5],
      "fechaNacimiento": user[6],
      "idPais": user[7],
      "creditos": user[8],
      "foto": user[9],
      "estado": user[10],
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
});
module.exports = router;
