import { Button, TextField } from "@mui/material";

type ActionItem = {
    actionItemId: number,
    item: string,
    pending_actions: boolean 
};
// Props type for the ActionItems component
type Props = {
    ActionItem :ActionItem[],
    isEditable:boolean,
    expandedNoteId : number,
    meetingId : number,
    deletActionItem: (expandedNoteId: number,actionItemId : number) => void;
    checkActionItemFromNotes:(expandedNoteId: number,actionItemId : number) => void;
    updateActionItems: (value : string , meetingId : number, actioItemId : number)=>void;
};
// ActionItems component
export default  function  Actionitems({
    ActionItem,
    isEditable,
    expandedNoteId,
    meetingId,
    deletActionItem,
    checkActionItemFromNotes,
    updateActionItems
}: Props,){
    // Function to toggle the checkbox of an action item
    function toggleCheckbox(event: any, actionItemId: number, expandedNoteId : number){
   
        event.stopPropagation();
        console.log("Chekbox item with ID: ", actionItemId,expandedNoteId );
        checkActionItemFromNotes(expandedNoteId,actionItemId)
       
      };
      // Function to delete an action item
      function deleteActionItem(event: any, actionItemId: number, expandedNoteId : number){
     
        event.stopPropagation();
        console.log("Deleting action item with ID: ", actionItemId,expandedNoteId );
        deletActionItem(expandedNoteId,actionItemId);
    
    };
    // Function to edit an action item
    function editActionItems(event:any,actionItemId: number, expandedNoteId : number ){

        event.stopPropagation();
        console.log('from edit action items - ', event.target.value, expandedNoteId,actionItemId);

        if(event.target.value === "" || event.target.value === null){
            alert("Action Item cannot be empty........");
        }else{
            updateActionItems(event.target.value, expandedNoteId,actionItemId);
        }

    }

    return (<>

        { 
            ActionItem.map((actionItem: any) => (
            <li key={actionItem.actionItemId} className="flex items-center">
                <input type="checkbox" checked={actionItem.pending_actions} className="mr-2" 
                disabled={!isEditable}
                onChange={(event) => toggleCheckbox(event, actionItem.actionItemId , expandedNoteId)}
                onClick={(e) => e.stopPropagation()}
                />

              {isEditable && expandedNoteId ===  meetingId ? (
                <>
                <TextField
                defaultValue={actionItem.item}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    className="mb-2"
                    onChange={(event: any) => editActionItems(event, actionItem.actionItemId , expandedNoteId)}
                    onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                  />
                  <Button variant="contained" size="small" onClick={(event: any) => deleteActionItem(event ,actionItem.actionItemId, expandedNoteId)}>Delete</Button>
                </>
              )
              :  
              <span>{actionItem.item}</span>
            }
            </li>
          ))
        }
        </>
    );
}
