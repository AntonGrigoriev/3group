var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Question = mongoose.model('Question');
var async = require('async');
var Validator = require('../libs/requestValidator');

module.exports.getTestStatus = function (userId, done) {
    Test.findOne({user: userId, $or: [{status: 'available'}, {status: 'requested'}]},
        function (err, test) {
            err ? done(err) :
                test ? done(null, {status: test.status}) : done(null, {status: 'notAvailable'});
        });
};

module.exports.requestTest = function (userId, done) {
    var test = new Test({user: userId, status: 'requested'});
    test.save(function(err) {
        done(err);
    });
};

module.exports.initTest = function (userId, done) {
    var validator = new Validator();

    validator.checkItem('test', function (callback) {
        Test.findOne({user: userId, status: 'available'}, callback);
    });

    validator.checkItem('template', function (callback) {
        TestTemplate.findOne(callback);
    });

    validator.exec(function (res) {
        var curDate = new Date();
        res.test.status = 'run';
        res.test.finishTime = curDate;
        res.test.save();

        done(null, {
            testId: res.test.id,
            time: res.template.time,
            count: res.template.questions.length,
            deadline: curDate
        });
    }, done);
};

module.exports.endTest = function (testId, done) {
    Test.findOne({_id: testId}, function (err, test) {
        if (err) {
            done(err);
        } else {
            test.status = 'checked';
            test.finishTime = Date.now();
            test.save(function (err) {
                done(err);
            });
        }
    });
};

module.exports.getAnswers = function (testId, done) {
    Test.findOne({_id: testId})
        .populate({path: 'answers', model: 'Answer'})
        .exec(function (err, test) {
            if(err) {
                done(err, null);
            } else {
                var response;
                if (test != null)
                    response = test.getNotAutomaticallyCheckAnswers();
                done(null, response);
            }
        });
};
