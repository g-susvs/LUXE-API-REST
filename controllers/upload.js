const path = require("path");
const fs = require("fs");

const { response, request } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Item } = require("../models");

const updateImageCloudinary = async (req = request, res) => {

  const { id, collection } = req.params;
  let model;

  if (collection == 'users') {
    model = await User.findById(id);
    if (!model) {
      return res.status(404).json({
        msg: `No se encontro el modelo de la colección ${collection}`
      })
    }

    // Limpiar imagen previa
    if (model.img) {
      const nameArr = model.img.split("/");
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split(".");
      await cloudinary.uploader.destroy(`LUXE/${collection}/${public_id}`);
    }

    const { tempFilePath } = req.files.file;
    const resp = await cloudinary.uploader.upload(tempFilePath, {
      folder: `LUXE/${collection}`
    });
    model.img = resp.secure_url;

    await model.save()

    return res.status(200).json(model);
  }

  if (collection == 'items') {
    model = await Item.findById(id);
    if (!model) {
      return res.status(404).json({
        msg: `No se encontro el modelo de la colección ${collection}`
      })
    }

    //===== Validar que tipo de imagen es mediante un query
    const { img } = req.query;
    const imgQueryValids = ['client', 'store'];

    if (!img || !imgQueryValids.includes(img)) {
      return res.status(400).json({
        msg: 'Falta el query para el tipo de imagen'
      })
    }

    if (img == 'client') {
      // Limpiar imagen previa
      if (model.img_client) {
        const nameArr = model.img_client.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        await cloudinary.uploader.destroy(`LUXE/${collection}/${public_id}`);
      }
    }
    if (img == 'store') {
      // Limpiar imagen previa
      if (model.img_store) {
        const nameArr = model.img_store.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        await cloudinary.uploader.destroy(`LUXE/${collection}/${public_id}`);
      }
    }

    const { tempFilePath } = req.files.file;
    const resp = await cloudinary.uploader.upload(tempFilePath, {
      folder: `LUXE/${collection}`
    });

    if (img == 'client') { model.img_client = resp.secure_url; }
    if (img == 'store') { model.img_store = resp.secure_url; }

    await model.save()

    return res.status(200).json(model);
  }
}

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  try {
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(404).json({
            msg: `No se encontro el modelo de la colección ${collection}`
          })
        }

        break;

      default:
        res.status(500).json({ msg: "No disponible" });
        break;
    }
    if (model.img) {
      return res.json({
        img: model.img
      })
    }

    const noFoundImg = path.join(__dirname, "../assets/no-image.jpg");

    res.sendFile(noFoundImg);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

module.exports = {
  showImage,
  updateImageCloudinary
}