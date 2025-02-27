import React, { useCallback, useState } from "react";
import { createEditor, Editor} from "slate";
import { Slate, Editable, withReact } from "slate-react";

// Initial content
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Hello World" }],
  },
];

// Function to toggle a mark (Bold, Italic, Underline)
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Function to check if a mark is active
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Toolbar component with buttons for text formatting
const Toolbar = ({ editor }) => (
<div className="flex gap-3 p-2 border-b border-gray-300 bg-gray-200 rounded-t-lg">
  <button
    className="px-3 py-1 bg-slate-900 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
    onMouseDown={(event) => { event.preventDefault(); toggleMark(editor, "bold"); }}
  >
    <b>B</b>
  </button>
  <button
    className="px-3 py-1 bg-slate-900 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
    onMouseDown={(event) => { event.preventDefault(); toggleMark(editor, "italic"); }}
  >
    <i>I</i>
  </button>
  <button
    className="px-3 py-1 bg-slate-900 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
    onMouseDown={(event) => { event.preventDefault(); toggleMark(editor, "underline"); }}
  >
    <u>U</u>
  </button>
</div>

);

// Main editor component
const BasicEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  // Function to render the text with applied styles
  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
  <Toolbar editor={editor} />
  <div className="p-4 bg-gradient-to-b from-gray-300 to-gray-300 ">
    <Editable
      renderLeaf={renderLeaf}
      className="p-5 min-h-[500px] bg-white text-gray-800 border border-gray-400 rounded-lg "
    />
  </div>
</Slate>

  );
};

export default BasicEditor;
