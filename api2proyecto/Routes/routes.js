const { Router } = require('express');
const router = Router();
const { mail } = require('../Email/email');
const BD = require('../Config/configdb');
router.get('/', async (req, res) => {
    res.json('Hola Mundo');
})
//GetuUsuario
router.get('/getTipoUsuario', async (req, res) => {
    sql = " select *from TipoUsuario ";

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
    const { idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,pais,foto,estado } = req.body;
    sql = "insert into Usuario(idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,pais,foto,estado)" +
        "values (:idTipo,:nombre,:apellido,:correo,:contrasenia,:fechaNacimiento,:pais,:foto,:estado)";
    await BD.Open(sql, [idTipo,nombre,apellido,correo,contrasenia,fechaNacimiento,pais,foto,estado], true);
    res.status(200).json({
        "Nombre": nombre,
        "Apellido": apellido,
        "correo": correo
    })
    mail('edsonguix@gmail.com','Edson');
})
//Validar Cuenta
//Login
router.get('/Validate/:nombre',async (req,res)=>{
    var nombreUsuario = req.params.nombre;
    sql = "update usuario set usuario.estado = '1' where usuario.nombre = :nombreUsuario";
    await BD.Open(sql, [nombreUsuario], true);
    res.json('Cuenta valida');
})
module.exports = router;
