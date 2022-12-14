var Img = require('../model/img');

exports.getImg = async function () {
    try {
        return await Img.find();

    } catch (err) {
        console.log(err);
    }
}

exports.searchImg = async function (searchValue) {
    try {
        return await Img.find({title: new RegExp(searchValue, 'i') }).limit(20);

    } catch (err) {
        console.log(err);
    }
}

exports.createImg = async function (Img) {
    try {
        var validation;

        if (validation) {
            return validation;
        }

        return await Img.create(Img);
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

exports.createImage = async (id, imageUrl) => {
    try {
        return await Movie.findOneAndUpdate({ _id: id }, { imageURL: imageUrl }, { new: true });
    } catch (err) {
        console.log(err);
    }
};