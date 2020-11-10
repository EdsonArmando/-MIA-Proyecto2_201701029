const { Router } = require('express');
const router = Router();
const { mail } = require('../Email/email');
const { mailCompra } = require('../Email/email');
const BD = require('../Config/configdb');
var dataUser;
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
//getLastId
router.get('/getLastIdCompra', async (req, res) => {
  sql = " select max(compra.idCompra) from compra";

  let result = await BD.Open(sql, [], false);
  var Users = [];

  result.rows.map(user => {
    let userSchema = {
      "codigo": user[0]
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//GetComentario
router.put('/getComentarios', async (req, res) => {
  const { id } = req.body;
  sql = "select comentario.idComentario,comentario.Descripcion,comentario.fecha,usuario.nombre, producto.nombre from comentario,usuario,producto where comentario.idProducto = :id and comentario.idUsuario = usuario.idUsuario and comentario.idProducto = producto.idProducto";

  let result = await BD.Open(sql, [id], true);
  var Users = [];

  result.rows.map(data => {
    let userSchema = {
      "id": data[0],
      "descripcion": data[1],
      "fecha": data[2],
      "nombre": data[3],
      "producto": data[4]
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//GetMegusta
router.put('/getMegusta', async (req, res) => {
  const { id } = req.body;
  sql = "select sum(megusta.cantidad) from megusta where megusta.idProducto = :id";

  let result = await BD.Open(sql, [id], true);
  var Users = [];

  result.rows.map(data => {
    let userSchema = {
      "cantidad": data[0]
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
})
//GetNoMegusta
router.put('/getNoMegusta', async (req, res) => {
  const { id } = req.body;
  sql = "select sum(noMeGusta.cantidad) from noMeGusta where noMeGusta.idProducto = :id";

  let result = await BD.Open(sql, [id], true);
  var Users = [];

  result.rows.map(data => {
    let userSchema = {
      "cantidad": data[0]
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
            "CORREO": user[4],
            "CONTRASENIA": user[5],
        }
        dataUser = userSchema;
        Users.push(userSchema);
    })
    var jsonString = JSON.stringify(Users);
    res.json(Users);
})
//Update creditos
router.put('/updateCreditos',async (req,res)=>{
  const { creditos, idUsuario } = req.body;
  sql = "update usuario set usuario.creditos = 10000 - :creditos where usuario.idUsuario = :idUsuario";
  await BD.Open(sql, [creditos, idUsuario], true);
  var jsonString = JSON.stringify(Users);
  res.json('Creditos actualizados Correctamente');
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
//create Comentario
router.post('/insertComentario',async (req,res)=>{
  const { idUsuario,idProducto,descripcion,fecha } = req.body;
  sql = "insert into Comentario(idUsuario,idProducto,descripcion,fecha)" +
    "values (:idUsuario,:idProducto,:descripcion,:fecha)";
  await BD.Open(sql, [idUsuario,idProducto,descripcion,fecha], true);
  res.status(200).json({
    "descripcion": descripcion
  })
})
//create Denuncia
router.post('/insertDenuncia',async (req,res)=>{
  const { idUsuario,idProducto,descripcion,fecha,estado } = req.body;
  sql = "insert into Denuncia(idUsuario,idProducto,descripcion,fecha,estado)" +
    "values (:idUsuario,:idProducto,:descripcion,:fecha,:estado)";
  await BD.Open(sql, [idUsuario,idProducto,descripcion,fecha,estado], true);
  res.status(200).json({
    "descripcion": descripcion
  })
})
//create Compra
router.post('/insertCompra',async (req,res)=>{
  console.log(req.body);
  const { idUsuario,fecha, total,correo } = req.body;
  sql = "insert into Compra(idUsuario,fecha) values (:idUsuario,:fecha)";
  let result = await BD.Open(sql, [idUsuario,fecha], true);
  res.status(200).json({
    "idUsuario": idUsuario
  })
  mailCompra(dataUser.CORREO,dataUser.NOMBRE,total,correo);
})
//create Detalle Compra
router.post('/insertDetalleCompra',async (req,res)=>{
  const { idCompra,idProducto,cantidad,fecha } = req.body;
  sql = "insert into detallecompra(idCompra,idProducto,cantidad,fecha)" +
    "values (:idCompra,:idProducto,:cantidad,:fecha )";
  await BD.Open(sql, [idCompra,idProducto,cantidad,fecha ], true);
  res.status(200).json({
    "idCompra": idCompra
  })
})
//create Me Gusta
router.post('/insertMegusta',async (req,res)=>{
  const { idUsuario,idProducto,cantidad } = req.body;
  sql = "insert into meGusta(idUsuario,idProducto,cantidad)" +
    "values (:idUsuario,:idProducto,1 )";
  await BD.Open(sql, [idUsuario,idProducto ], true);
  res.status(200).json({
    "idUsuario": idUsuario
  })
})
//create NO Gusta
router.post('/insertNoMegusta',async (req,res)=>{
  const { idUsuario,idProducto,cantidad } = req.body;
  sql = "insert into nomegusta(idUsuario,idProducto,cantidad)" +
    "values (:idUsuario,:idProducto,1 )";
  await BD.Open(sql, [idUsuario,idProducto ], true);
  res.status(200).json({
    "idUsuario": idUsuario
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
  sql = "Select *  from usuario where usuario.nombre =: username";
  let result = await BD.Open(sql, [username], true);
  var Users = [];
  result.rows.map(user => {
    let userSchema = {
      "idUsuario": user[0],
      "nombre": user[2],
      "apellido": user[3],
      "contrasenia": user[5],
      "fecha": user[6],
      "idPais": user[7],
      "correo": user[4],
      "creditos": user[8]
    }
    Users.push(userSchema);
  })
  var jsonString = JSON.stringify(Users);
  res.json(Users);
});
//Update User
router.put('/updateUser',async (req,res)=>{
  const { idUsuario,nombre,apellido,contrasenia,fechaNacimiento,pais,foto,correo, creditos, estado } = req.body;
  sql = "UPDATE Usuario SET idTipo = 1, nombre = :nombre, apellido = :apellido, contrasenia = :contrasenia, fechaNacimiento = :fecha, idPais = :pais, foto = :foto, correo = :correo, creditos = :creditos, estado = :estado where idUsuario = :idUsuario";
  await BD.Open(sql, [nombre,apellido,contrasenia,fechaNacimiento,pais,foto,correo,creditos, estado,idUsuario], true);
  res.status(200).json({
    "Nombre": nombre,
    "Apellido": apellido,
    "correo": correo
  })
})
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
