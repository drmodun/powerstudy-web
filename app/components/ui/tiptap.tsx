// src/Tiptap.tsx
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu editor={null}>Floating menu</FloatingMenu>
      <BubbleMenu editor={null}>Bubble menu</BubbleMenu>
    </EditorProvider>
  );
};

export default Tiptap;
