import React, { useState } from 'react';
// Type for creating a new note
type createNote = {
  title: string;
  content: string;
  actionItems: { actionItemId: number; item: string; pending_actions: boolean }[];
  createdDate: string;
};

// Props type for the NewNoteForm component
type Props ={
  createNewNote: (note : createNote)=> void;
}

// NewNoteForm component
const NewNoteForm = ({createNewNote}: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [actionItems, setActionItems] = useState([{ actionItemId: 1, item: '', pending_actions: false }]);
 
  // Function to handle change in action item input
  const handleActionItemChange = (index: any, value : any) => {
    const updatedActionItems = [...actionItems];
    updatedActionItems[index].item = value;
    setActionItems(updatedActionItems);
  };

   // Function to add a new action item
  const handleAddActionItem = () => {
    setActionItems([...actionItems, { actionItemId: actionItems.length + 1, item: '', pending_actions: false }]);
  };

  // Function to remove an action item
  const handleRemoveActionItem = (index : any) => {
    const updatedActionItems = [...actionItems];
    updatedActionItems.splice(index, 1);
    setActionItems(updatedActionItems);
  };

  // Function to handle form submission
  const handleSubmit = (e : any) => {
    e.preventDefault();
    const currentDate = new Date().toISOString(); // Get the current date
    createNewNote({ title, content, actionItems, createdDate: currentDate }); // Include the created date in the saved note
    setTitle('');
    setContent('');
    setActionItems([{ actionItemId: 1, item: '', pending_actions: false }]);
   
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Action Items</label>
          {actionItems.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={item.pending_actions}
                onChange={(e) => {
                  const updatedActionItems = [...actionItems];
                  updatedActionItems[index].pending_actions = e.target.checked;
                  setActionItems(updatedActionItems);
                }}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter action item"
                value={item.item}
                onChange={(e) => handleActionItemChange(index, e.target.value)}
              />
              <button
                className="ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleRemoveActionItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddActionItem}
          >
            Add Action Item
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
