import express from "express";
import { addNotesController, findNotesController, getAllNotesController , deletByMeetingId , deleteByresource , updateMeetingController, findByKeywordController} from '../controller/meeting-notes-controller.js'

const routes = express.Router();

//find by keyword
routes.route('/filter').get(findByKeywordController);

//add Notes controller and get all Notes Controller
routes.route('/').post(addNotesController).get(getAllNotesController);

//find meeting note by ID
routes.route('/:id').get(findNotesController);

//delete meeting note by ID
routes.route('/:meetingId').delete(deletByMeetingId);

//delete meeting note by resource
routes.route('/').delete(deleteByresource);


//update meeting note by source by meetingId
routes.route('/:meetingId').put(updateMeetingController);



export default routes;
