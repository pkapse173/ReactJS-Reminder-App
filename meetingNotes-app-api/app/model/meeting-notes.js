import mongoose from "mongoose";

//Schema for meeting Action Items
const actionItems = new mongoose.Schema({
        actionItemId:{
            type : Number,
            required : true
        },
        item : {
            type : String,
            required : true
        },
        pending_actions: {
            type : Boolean,
            required : true
        }
});

//Schema for Meeting Notes
const meetingNotes = new mongoose.Schema({
        meetingId:{
            type:Number,
            required:true
        },
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required:true
        },
        actionItems:[actionItems],
        createdDate:{
            type: Date,
            required:true
        }
});

//Model Creation
const model = mongoose.model('meetingnotes',meetingNotes);

export default model;