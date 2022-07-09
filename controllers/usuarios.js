const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre='Sin nombre', edad} = req.query;

    res.json({
        'msg': 'get Api - controlador',
        q, nombre, edad
    })
  }

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        'msg': 'put Api - controlador'
    })
  }

const usuariosPost = (req, res = response) => {

    const body = req.body;
    const { edad } = req.body;
    const {id} = req.params;

    res.json({
        'msg': 'post Api - controlador',
        body, id, edad
    })
  }

const usuariosDelete = (req, res = response) => {

    res.json({
        'msg': 'delete Api - controlador'
    })
  }




  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }