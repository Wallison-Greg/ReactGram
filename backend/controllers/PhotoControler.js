const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//insert a photo, with an user related to it 

const insertPhoto = async (req, res) => {

    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title, 
        userId: user._id,
        userName: user.name,
    });

    if(!newPhoto){
        res.status(422).json({errors: ["houve um problema, porfavor tente mais tarde"]})
        return
    }

    res.status(201).json(newPhoto);
}

//remove a photo from db

const deletePhoto = async (req, res) => {

    const {id} = req.params
    const reqUser = req.user

    try {

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        //check if photo exist

        if(!photo){
            res.status(404).json({errors: ["foto não encontrada"]});
            return;
        }

        //check if photo belongs to user 
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["houve um problema, porfavor tente mais tarde"]});
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({id: photo._id, message: "foto excluida com sucesso"});

    } catch (error) {
        res.status(404).json({errors: ["foto não encontrada"]});
        return;
    }
}

//get all photo 

const getAllPhoto = async(req, res) => {

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

//get user photos

const getUserPhotos = async (req, res) => {

    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

//get photo by id

const getPhotoById = async (req, res) => {

    const {id} = req.params

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //checked is exist

    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return
    }

    res.status(200).json(photo)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhoto,
    getUserPhotos,
    getPhotoById,
}