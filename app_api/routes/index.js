var express = require('express');
var router = express.Router();

var ctrlCliente = require('../controllers/cliente');
var ctrlMovilidad = require('../controllers/movilidad');
var ctrlEmbarque = require('../controllers/embarque');

/*Cliente api*/
router.get('/cliente', ctrlCliente.ClienteList);//obtenemos la lista
router.get('/cliente/:DNI', ctrlCliente.ClienteReadOne);//mostrar un especifico
router.post('/cliente', ctrlCliente.ClienteCreate);//crear 
router.post('/cliente/update', ctrlCliente.ClienteUpdateOne);// actualizar un user en especifico
router.delete('/cliente/:DNI', ctrlCliente.ClienteDeleteOne); //eliminar un user en especifico

/*Movilidad api*/
router.get('/movilidad', ctrlMovilidad.MovilidadList);//obtenemos la lista 
router.get('/movilidad/:placa', ctrlMovilidad.MovilidadReadOne);//mostrar un especifico
router.post('/movilidad', ctrlMovilidad.MovilidadCreate);//crear 
router.post('/movilidad/update', ctrlMovilidad.MovilidadUpdateOne);// actualizar un especifico
router.delete('/movilidad/:placa', ctrlMovilidad.MovilidadDeleteOne); //eliminar un especifico
router.post('/movilidad/update/gps',ctrlMovilidad.MovilidadUpdateGPS);//gps

/*Embarque api*/
router.get('/embarque', ctrlEmbarque.EmbarqueList);
router.get('/embarque/:embarque', ctrlEmbarque.EmbarqueReadOne);
router.post('/embarque', ctrlEmbarque.EmbarqueCreate);
router.post('/embarque/update', ctrlEmbarque.EmbarqueUpdateOne);
router.delete('/embarque/:embarque', ctrlEmbarque.EmbarqueDeleteOne);

/* */
router.post('/report/embarque', ctrlEmbarque.EmbarqueReport);

/* Registrar Asientos */
//router.put('/embarque/:embarque/asiento', ctrlEmbarque.RegistrarAsiento);


module.exports = router;
