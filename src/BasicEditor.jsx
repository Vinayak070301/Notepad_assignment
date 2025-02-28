import React, { useCallback, useEffect, useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Toolbar component
const Toolbar = ({ editor }) => (
  <div className="flex gap-3 p-2 border-b border-gray-300 bg-gray-200 rounded-t-lg">
    <button
      className="px-3 py-1 bg-slate-900 text-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, "bold");
      }}
    >
      <b>B</b>
    </button>
    <button
      className="px-3 py-1 bg-slate-900 text-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, "italic");
      }}
    >
      <i>I</i>
    </button>
    <button
      className="px-3 py-1 bg-slate-900 text-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 active:scale-95"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, "underline");
      }}
    >
      <u>U</u>
    </button>
    <button
      className="ml-auto px-4 py-1 bg-green-600 text-white border border-gray-300 rounded-md shadow-sm hover:bg-green-700 active:scale-95"
      onClick={() => saveAsDocx(editor)}
    >
      Save as DOCX
    </button>
  </div>
);

// Function to toggle text formatting
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Save content as DOCX
const saveAsDocx = async (editor) => {
  const { Document, Packer, Paragraph, TextRun } = await import("docx");

  const content = editor.children.map((node) => {
    const textRuns = node.children.map((child) => {
      let run = new TextRun(child.text);
      if (child.bold) run = run.bold();
      if (child.italic) run = run.italics();
      if (child.underline) run = run.underline();
      return run;
    });
    return new Paragraph({ children: textRuns });
  });

  const doc = new Document({ sections: [{ properties: {}, children: content }] });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "document.docx");
  });
};

// Main Editor Component
const BasicEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [initialValue, setInitialValue] = useState([
    { type: "paragraph", children: [{ text: "Loading content..." }] },
  ]);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/text");
        const text = await response.text();
        const extractedText = text.replace(/<\/?p>/g, ""); // Remove <p> tags
  
        // Update the editor state dynamically
        Editor.withoutNormalizing(editor, () => {
          editor.children = [{ type: "paragraph", children: [{ text: extractedText }] }];
          editor.onChange();
        });
  
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };
    fetchText();
  }, [editor]); // Dependency array includes editor
  

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
      <div className="p-4 bg-gradient-to-b from-gray-300 to-gray-300">
        <Editable
          renderLeaf={renderLeaf}
          className="p-5 min-h-[500px] bg-white text-gray-800 border border-gray-400 rounded-lg"
        />
      </div>
    </Slate>
  );
};

export default BasicEditor;
