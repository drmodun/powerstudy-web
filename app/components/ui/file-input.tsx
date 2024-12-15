import * as React from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils";

export interface FileInputProps
  extends Omit<DropzoneOptions, "className" | "children"> {
  className?: string;
  placeholder?: React.ReactNode;
  preview?: boolean;
  onChange?: (files: File[]) => void;
}

const FileInput = React.forwardRef<HTMLDivElement, FileInputProps>(
  (
    {
      className,
      placeholder = "Drop files here or click to select",
      preview = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      ...props,
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
        onChange?.(acceptedFiles);
      },
    });

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={cn(
          "flex min-h-[150px] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          isDragActive && "border-primary ring-1 ring-primary",
          className
        )}
      >
        <input {...getInputProps()} />
        {files.length > 0 && preview ? (
          <div className="grid gap-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 rounded-md border p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span>{placeholder}</span>
            {isDragActive ? (
              <span className="text-primary">Drop the files here...</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
