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

//update a photo 

const upadatePhoto = async (req, res) => {

    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //check if photo exists

    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return
    }

    //check if photo belongs to user

    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["houve um problema, porfavor tente mais tarde"]});
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: "foto atualizada com sucesso"})
}

//like function 

const likePhoto = async (req, res) => {

    const {id} =req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //check if photo exists

    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return
    }

    //check if user already liked photo 

    if(photo.like.includes(reqUser._id)){
        res.status(422).json({errors: ["voce ja curtiu a foto"]});
        return
    }

    // put user id in likes array

    photo.like.push(reqUser._id)

    photo.save()

    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida"})
}

//comment function

const commentPhoto = async (req, res) => {

    const {id} = req.params
    const {comment} =req.body
    const reqUser = req.user

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    //check if photo exists

    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return
    }

    //put comment in the array comment 

    const userComment = {
        comment, 
        userName: user.name,
        userId: user._id,
        userImage: user.profileImage
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "O comentario foi cadastrado com sucesso"
    })
}

//search photo by title

const searchPhoto = async (req, res) => {
    
    const {q} = req.query

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhoto,
    getUserPhotos,
    getPhotoById,
    upadatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto
}