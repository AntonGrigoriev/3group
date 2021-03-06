var mongoose = require('mongoose');

var OpenQuestionSchema = new mongoose.Schema({
    question: {type: String, required: true}
}, {
    discriminatorKey: 'type'
});

OpenQuestionSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        question: this.question
    };
};

OpenQuestionSchema.methods.setQuestion = function (question) {
    this.header = question._header;
    this.difficulty = question._difficulty;
    this.maxCost = question._maxCost;
    this.autoCheck = false;
    this.question = question._question;
};

mongoose.model('Question').discriminator('OpenQuestion', OpenQuestionSchema); 