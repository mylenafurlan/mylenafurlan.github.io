var express = require('express');
var router = express.Router();
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();
var movieController = require('../control/imgControl.js');
const multer = require("multer");
const uploadConfig = require("../multer_config/upload");
const upload = multer(uploadConfig.upload("./upload/images"));

router.get('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async function (req, res, next) {
    var searchValue = req.query.search_value;
    if (searchValue) {
        var img = await movieController.searchImg(searchValue);
        return res.send(img);
    }
    
    var img = await imgControl.getImg();
    return res.send(img);
});

router.post('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async function (req, res, next) {
    if (req.auth.permission == 0){
        return res.status(403).send("Usuário não possui permissão!");
    }
    var response = await imgControl.createImage(req.body);

    if (response == null) {
        return res.status(400).send("Erro ao subir imagem");
    }
    return res.status(201).send(response);
});

router.patch("/:id/image", jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), upload.single("image"), async (req, res) => {
    if (req.auth.permission == 0){
        return res.status(403).send("Usuário sem permissão");
    }
    const { id } = req.params;
    const { file } = req;
    const imageUrl = file.filename;

    if (!file) {
        return res.status(400).send("Erro ao atualizar imagem!");
    }

    const response = await imgControl.createImage(id, imageUrl);
    return res.status(200).send(response);

});

module.exports = router;