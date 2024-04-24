import { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import Sidebar from './components/SideBar';
import ContentSection from './components/ContentSection';
import { Note } from '@mui/icons-material';
import WelcomeMessage from './components/Welcome'
import NewNoteForm from './components/NewNote';


type createNote = {
  title: string;
  content: string;
  actionItems: { actionItemId: number; item: string; pending_actions: boolean }[];
  createdDate: string;
};

type Note = {
  meetingId: number;
  title: string;
  content: string;
  actionItems: { actionItemId: number; item: string; pending_actions: boolean }[];
  createdDate: string;
};

// App component
function App() {
  const [isVisibleSideBar, setVisibleSideBar] = useState(false);
  const [isVisibleMynotes, setVisibleMyNotes] = useState(false);
  const [isNewForm, setNewForm] = useState(false);


  const [myNotes, setMyNotes]  = useState<Note[]>([]);

  function setVisiblitiBar(){
    
    setVisibleSideBar((prev) => !prev );
    
  }

  useEffect(()=>{

    async function getData() {
  
      const response = await fetch('http://localhost:4000/meetingNotes');
      const resData = await response.json();
      setMyNotes(resData);
  
    }
  
    getData();
     

  },[]);

  console.log(" mynotes ",myNotes);
  function deletActionItemFromNotes(meetingIds : number, actioItemId : number){

    setMyNotes((previous) => {
      const editedItemIndex = previous.findIndex(prev => prev.meetingId === meetingIds);
      if (editedItemIndex === -1) {
          // Meeting ID not found in the notes
          return previous;
      }

      const editedItem = { ...previous[editedItemIndex] }; // Shallow clone of the edited item
      editedItem.actionItems = editedItem.actionItems.filter(item => item.actionItemId !== actioItemId);

      // Update the notes array with the edited item
      const updatedNotes = [...previous];
      updatedNotes[editedItemIndex] = editedItem;

      return updatedNotes;
  });
    
  }

  function checkActionItemFromNotes(meetingIds : number, actioItemId : number){

      console.log("Inside app tsx for check box......", meetingIds,actioItemId);

      setMyNotes((previous) => {
        const editedItemIndex = previous.findIndex(prev => prev.meetingId === meetingIds);
        if (editedItemIndex === -1) {
            // Meeting ID not found in the notes
            return previous;
        }

        const editedItem = { ...previous[editedItemIndex] }; // Shallow clone of the edited item
        console.log("previous item selected state - ",editedItem);
        const actionitem = editedItem.actionItems.findIndex( prev => prev.actionItemId === actioItemId);

        editedItem.actionItems[actionitem].pending_actions = !editedItem.actionItems[actionitem].pending_actions;
  
        // Update the notes array with the edited item
        const updatedNotes = [...previous];
        updatedNotes[editedItemIndex] = editedItem;
  
        return updatedNotes;
    });

  }

  function updateActionItems(value :string , meetingId : number, ActionitemId : number){

      const empty = value === "" || value === null;


      setMyNotes((previous) => {

        const editedItemIndex = previous.findIndex(prev => prev.meetingId === meetingId);
        if (editedItemIndex === -1) {
            // Meeting ID not found in the notes
            return previous;
        }

    
        const editedItem = { ...previous[editedItemIndex] }; // Shallow clone of the edited item
       
        const actionitem = editedItem.actionItems.findIndex( prev => prev.actionItemId === ActionitemId);

        if(!empty) editedItem.actionItems[actionitem].item = value;
        else editedItem.actionItems = editedItem.actionItems.filter( action =>  action.actionItemId != ActionitemId);

        console.log("previous item selected state - ",editedItem);
        // Update the notes array with the edited item
        const updatedNotes = [...previous];
        updatedNotes[editedItemIndex] = editedItem;
  
        return updatedNotes;
    });
  }

  function SaveEditedNotes(meetingId:number, title:string , content: string ){

    setMyNotes((previous) => {
      const editedItemIndex = previous.findIndex(prev => prev.meetingId === meetingId);
      if (editedItemIndex === -1) {
          // Meeting ID not found in the notes
          return previous;
      }

      const editedItem = { ...previous[editedItemIndex] }; // Shallow clone of the edited item

      editedItem.title = title ;
      editedItem.content = content;

      console.log("Edited item details - ",editedItem);
      console.log("Edited Action Items item details - ",editedItem.actionItems);
  

      console.log(" JSON Object - ",JSON.stringify(editedItem));

      async function editDetails(){

        try {
          const response = await fetch('http://localhost:4000/meetingNotes/' + meetingId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedItem)
          });
  
          // Check if the request was successful
          if (!response.ok) {
            throw new Error('Failed to save edited notes');
          }
  
          // Log the response data
          const responseData = await response.json();
          console.log(responseData);
        } catch (error : any) {
          console.error('Error saving edited notes:', error.message);
        }

      }

      editDetails();

      const updatedNotes = [...previous];
      updatedNotes[editedItemIndex] = editedItem;

      return updatedNotes;
  });

  }

  // Function to delete a note
   function onDeleteId(meetingId: number){

    setMyNotes((previous) => {

      const UpdatedMeetings = previous.filter(prev => prev.meetingId !== meetingId);
      
      async function onDelete() {

        try{

          const response = await fetch('http://localhost:4000/meetingnotes/'+meetingId,{
            method:'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to save edited notes');
          }

          const resData = await  response.json();

        }catch(error: any){
          console.error('Error saving edited notes:', error.message);
        }
        
      }
      
      onDelete();

      return UpdatedMeetings;
  });
   }

// Function to set visibility for my notes
   function OnMyNotesVisiblity(){

    setVisibleMyNotes(true);
    setVisibleSideBar(false);
    setNewForm(false);

   }

   // Function to set visibility for new note form
   function setNewFormFunction(){
    setNewForm(true);
    setVisibleMyNotes(false);
    setVisibleSideBar(false);
   }

    // Function to create a new note
   function createNewNote(note: createNote) {
    console.log(" Note is -- ", note);
  
    const newNoteCreated = {
      meetingId: myNotes.length + 1,
      title: note.title,
      content: note.content,
      actionItems: note.actionItems,
      createdDate: note.createdDate
    }
  
    console.log(" Note After new one created  -- ", newNoteCreated);
    console.log(" JSON Conversion -- ", JSON.stringify(newNoteCreated));
  
    setMyNotes((prev) => {
      async function newNote() {
        try {
          const response = await fetch('http://localhost:4000/meetingnotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNoteCreated)
          });
  
          if (!response.ok) {
            throw new Error('Failed to save new note');
          }
  
          const resData = await response.json();
          console.log(resData);

          setVisibleMyNotes(true);
          setNewForm(false);
  
        } catch (error: any) {
          console.error('Error saving new note:', error.message);
        }
      }
  
      newNote();

  
      return [...prev, newNoteCreated];
    });
  }
  


  return (
    <>
     <div className="h-screen bg-gradient-to-r from-white-400 to-blue-500">
     <NavBar setVisibility={setVisiblitiBar}/>
     <Sidebar open={isVisibleSideBar} onClose={setVisiblitiBar} onMyNotes={OnMyNotesVisiblity} setNewFormFunction={setNewFormFunction}/>

     { isNewForm &&  <NewNoteForm createNewNote={createNewNote}/>}
      {!isVisibleMynotes && !isNewForm && <WelcomeMessage/> }
      { isVisibleMynotes && (
         <ContentSection 
         MyNotes={myNotes} 
         deletActionItemFromNotes={deletActionItemFromNotes} 
         checkActionItemFromNotes={checkActionItemFromNotes}
         updateActionItems ={updateActionItems}
         SaveEditedNotes={SaveEditedNotes}
         onDeleteId={onDeleteId}
         />
      )}
      </div>
    </>
  )
}

export default App;
