// src/Tiptap.tsx
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuIcon } from "lucide-react";

const extensions = [StarterKit];

export interface MarkdownEditorProps {
  content: string;
}

const MarkdownEditor = ({ content }: MarkdownEditorProps) => {
  return (
    <EditorProvider
      immediatelyRender={false}
      extensions={extensions}
      content={content}
    >
      <FloatingMenu editor={null}>
        <MenuIcon />
      </FloatingMenu>
      <BubbleMenu editor={null}>
        <MenuIcon />
      </BubbleMenu>
    </EditorProvider>
  );
};

//TODO: maybe make this also have some other options

export default MarkdownEditor;
