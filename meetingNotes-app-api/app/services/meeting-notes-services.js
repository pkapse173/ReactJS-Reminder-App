
import meetingNotes from '../model/meeting-notes.js'


//Mongoose connect for creating new Notes
export const addNotes = async(notes) =>{

    const meetingnote = new meetingNotes(notes);
    return meetingnote.save();
    
}

//Mongoose connect to find by Id
export const search = async(id) =>{

    const foundNotes = await meetingNotes.findById(id).exec();
    return foundNotes;
}


//Mongoose to get All Meeting Notes
export const getAll = async()=>{
    const allNotes = await meetingNotes.find().exec();
    return allNotes;
}

//Mongoose connect to delete by Id
export const deleteById = async(Id)=>{

    console.log(Id);
    const meetingId = {meetingId : Id};
    const allNotes = await meetingNotes.deleteOne(meetingId);
    return allNotes;
}

//Mongoose Delet by Resource
export const deleteByResource = async(resource)=>{

    console.log("Resource....",resource)
    const deletedresource = await meetingNotes.findOneAndDelete(resource);
    return deletedresource;
}

//Update Existing meeting Node
export const updateMeeting = async(id , meeting) =>{

    const meetingId = {meetingId : id};
    console.log("before edit - ",meeting);
    const updatedMeeting = await meetingNotes.findOneAndUpdate(meetingId,{...meeting});
    console.log("After edit ",updatedMeeting);
    return updatedMeeting;
}

//Filter by keywords
export const filterByKeywords = async (keywords, startDate, endDate) => {
    let query = {};

    // If keywords are provided
    if (keywords && keywords.trim() !== '') {
        query.$or = [
            { title: { $regex: keywords, $options: 'i' } },
            { content: { $regex: keywords, $options: 'i' } },
            { "actionItems.item": { $regex: keywords, $options: 'i' } }
        ];
    }

    // If start and end dates are provided
    if (startDate && endDate) {
        query.createdDate = { $gte: startDate, $lte: endDate };
    }

    // Use find() method to retrieve MeetingNotes that match the query
    const filteredMeetingNotes = await meetingNotes.find(query);

    return filteredMeetingNotes;
}
