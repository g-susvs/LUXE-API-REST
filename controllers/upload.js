const path = require("path");
const fs = require("fs");

const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

//======================================== Optimizar
const {User, Container, Item} = require("../models");

//========================================

const updateImageCloudinary = async (req, res) => {

  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(404).json({
          msg: `No se encontro el modelo de la colección ${collection}`
        })
      }
      break;
    case "containers":
      model = await Container.findById(id);
      if (!model) {
        return res.status(404).json({
          msg: `No se encontro el modelo de la colección ${collection}`
        })
      }
      break;
    case "items":
      model = await Item.findById(id);
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

  res.status(200).json(model);
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