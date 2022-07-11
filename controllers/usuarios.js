const {response, request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    //const {q, nombre='Sin nombre', edad} = req.query;

    const {limite = 5, desde = 0, estado = true} = req.query;
    const query = {estado: estado}

    const [ total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
      total, usuarios
    })
  }

const usuariosPut = async (req = request, res = response) => {

    const {id} = req.params;

    const {_id, password, google, correo, ...resto} = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto) 

    res.json(usuario)
  }

const usuariosPost = async (req, res = response) => {


    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});


    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();
    //const { edad, nombre } = req.body;
    //const {id} = req.params;

    res.json({
        usuario
    })
  }

const usuariosDelete = async (req, res = response) => {


    const {id} = req.params;

    const usuario = await Usuario.findByIdAndDelete(id)

    //const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json(usuario)
  }




  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }