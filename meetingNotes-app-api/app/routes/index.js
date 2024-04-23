import routes from "./meeting-notes-routes.js"

//Initilize the routes for meetingnotes
export const initializeRouter = (app)=>{
    app.use('/meetingnotes',routes);
}