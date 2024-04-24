import { Button, Checkbox, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import Actionitems from './ActionItems';

// Defining the type for each note
type Note = {
  meetingId: number;
  title: string;
  content: string;
  actionItems: { actionItemId: number; item: string; pending_actions: boolean }[];
  createdDate: string;
};
// Props type for the ContentSection component
type Props = {
  MyNotes: Note[];
  deletActionItemFromNotes: (meetingId: number, actioItemId: number) => void;
  checkActionItemFromNotes: (meetingId: number, actioItemId: number) => void;
  updateActionItems: (value: string, meetingId: number, actioItemId: number) => void;
  SaveEditedNotes: (meeingId: number, title: string, content: string) => void;
  onDeleteId: (meeingId: number) => void;
};

// ContentSection component
export default function ContentSection({
  MyNotes,
  deletActionItemFromNotes,
  checkActionItemFromNotes,
  updateActionItems,
  SaveEditedNotes,
  onDeleteId
}: Props) {
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  const [isEditable, setEditable] = useState<boolean>(false);
  const refTitle = useRef<HTMLInputElement>(null);
  const refContent = useRef<HTMLInputElement>(null);

  const toggleExpand = (noteId: number) => {
    setExpandedNoteId((prevNoteId) => (prevNoteId === noteId ? null : noteId));
    
  };
   // Function to handle delete action for a note
  function onDelete(event: any, meetingId: number) {
    console.log(" Inside Delete.....", meetingId);
    event.stopPropagation();
    onDeleteId(meetingId);
  }
// Function to enable edit mode
  function onEdit(event: any) {
    event.stopPropagation();
    setEditable(true);
  }
// Function to save edited note
  function onSave(meetingId: number) {
    if (!refTitle.current?.value || !refContent.current?.value) {
      setEditable(false);
      alert(" Title or Content cannot be ampty......");
    } else {
      SaveEditedNotes(meetingId, refTitle.current?.value, refContent.current?.value);
      setEditable(false);
    }
  }
// Function to cancel edit mode
  function onCancel(event: any) {
    event.stopPropagation();
    setEditable(false);
  }

  console.log(" expanded id ", expandedNoteId);

  return (
    <div className="flex flex-wrap mt-3 mx-3 ">
      {MyNotes.map((note) => (
        <div
          key={note.meetingId}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 transition-all px-3 px-3 ${
            expandedNoteId === note.meetingId ? 'h-auto' : 'h-60 overflow-hidden'
          }`}
          onClick={() => toggleExpand(note.meetingId)}
        >
          <div className="bg-gray-100 border border-gray-300 rounded-md shadow-md h-full flex flex-col ">

            {isEditable && expandedNoteId === note.meetingId ? <>
              <TextField
                inputRef={refTitle}
                label="Title"
                defaultValue={note.title}
                fullWidth
                margin="normal"
                variant="outlined"
                className="mb-2"
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              />
              <TextField
                inputRef={refContent}
                label="Content"
                defaultValue={note.content}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                className="mb-2"
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              />
            </>
              :
              <div className="px-3 py-2">
                <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                <p className={`text-gray-600 mb-4 ${expandedNoteId === note.meetingId ? '' : 'truncate'}`}>
                  {expandedNoteId === note.meetingId ? note.content : truncateContent(note.content)}
                </p>
              </div>
            }


            {expandedNoteId === note.meetingId && (
              <div className="mb-4 px-3 py-1">
                <h3 className="text-lg font-bold mb-2">Action Items:</h3>
                <ul>
                  <Actionitems ActionItem={note.actionItems}
                    isEditable={isEditable}
                    expandedNoteId={expandedNoteId}
                    meetingId={note.meetingId}
                    deletActionItem={deletActionItemFromNotes}
                    checkActionItemFromNotes={checkActionItemFromNotes}
                    updateActionItems={updateActionItems}
                  />
                </ul>
              </div>
            )}

            <div className="mt-auto p-3">
              <p className="text-gray-500">Meeting ID: {note.meetingId}</p>
              <p className="text-gray-500">Created Date: {new Date(note.createdDate).toDateString()}</p>
            </div>

            {isEditable && expandedNoteId === note.meetingId ?
              expandedNoteId === note.meetingId && (
                <div className="flex justify-end px-4 pb-3">
                  <div className="inline-flex space-x-2 items-center">
                    <Button variant="contained" size='small' onClick={() => onSave(expandedNoteId)} color="primary">Save</Button>
                    <Button variant="contained" size='small' onClick={(e: any) => { onCancel(e) }} color="primary">Cancel</Button>
                  </div>
                </div>)
              :
              expandedNoteId === note.meetingId && (<div className="flex justify-end px-4 pb-3">
                <div className="inline-flex space-x-2 items-center">
                  <Button variant="contained" size='small' onClick={onEdit} color="primary">Edit</Button>
                  <Button variant="contained" size='small' onClick={(e: any) => onDelete(e, expandedNoteId)} color="primary">Delete</Button>
                </div>
              </div>)

            }

          </div>

        </div>
      ))}
    </div>
  );
}
// Function to truncate content for display
function truncateContent(content: string): string {
  const words = content.split(' ');
  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + '...';
  }
  return content;
}
