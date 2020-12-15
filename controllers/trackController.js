const Track = require('../models/track');
const CartItem = require('../models/userCart');

const renderPage = function(err, req, res, templateName, templateObj ) {
    const username = req.query.username;
    if (err) throw err;
    if (username != null) {
        res.render(templateName, templateObj);
    }
    else {
        templateObj.username = '';
        res.render(templateName, templateObj);
    }
};

exports.getTracks = function(req, res) {
    Track.find({}, function (err, data) { 
        const templateName = 'track-list';
        const templateObj = {
            tracks: data, 
            title: 'Product List', 
            username: req.query.username 
        };

        renderPage(err, req, res, templateName, templateObj);
    });
};

exports.getAddTrack = function(req, res) {
    Track.find({}, function (err, data) {
        const templateName = 'track-add';
        const templateObj = {
            tracks: data, 
            title: 'Add Track', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);
    });
};

exports.deleteTrack = function(req, res) {
    Track.findByIdAndRemove({ _id: req.params._id }, function (err, data) {
        const templateName = 'track-add';
        const templateObj = {
            tracks: data, 
            title: 'Add Track', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);
    });
};

exports.postAddTrack = function(req, res) {
    Track(req.body).save(function (err, data) {
        const templateName = 'track-add';
        const templateObj = {
            tracks: data, 
            title: 'Track', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);        
    });
};

exports.postCart = function(req, res) {
    CartItem(req.body).save(function (err, data) {
        const templateName = 'cart';
        const templateObj = {
            cartitems: data, 
            title: 'Shopping Cart', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);         
    });
};

exports.getCart = function(req, res) {
    CartItem.find({ username: req.query.username }, function (err, data) {
        const templateName = 'cart';
        const templateObj = {
            cartitems: data, 
            title: 'Shopping Cart', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);        
    });
};

exports.deleteFromCart = function(req, res) {
    CartItem.findByIdAndRemove({ _id: req.params._id }, function (err, data) {
        const templateName = 'cart';
        const templateObj = {
            cartitems: data, 
            title: 'Shopping Cart', 
            username: req.query.username 
        };
        renderPage(err, req, res, templateName, templateObj);

    });           
};
