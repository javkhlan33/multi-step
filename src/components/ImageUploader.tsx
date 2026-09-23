"use client";

import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormField } from "./FormField";
import { validateImageFile } from "@/lib/validation";

type ImageUploaderProps = {
  error?: string;
  onImageChange: (file: File | null) => void;
  onValidationError: (message: string | undefined) => void;
  initialPreviewUrl?: string | null;
};

export function ImageUploader({
  error,
  onImageChange,
  onValidationError,
  initialPreviewUrl = null,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const applyFile = (file: File | undefined) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      onValidationError(validationError);
      return;
    }

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageChange(file);
    onValidationError(undefined);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    applyFile(Array.from(event.dataTransfer.files).at(0));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resetFileInput = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onImageChange(null);
    onValidationError(undefined);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  return (
    <FormField name="profileImage" label="Profile image" error={error}>
      {previewUrl ? (
        <div className="relative">
          <div className="flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Profile preview"
              height={180}
              width={416}
              className="w-full h-[180px] rounded-md object-cover"
            />
          </div>
          <button
            type="button"
            onClick={resetFileInput}
            aria-label="Remove image"
            className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 bg-[#202124] rounded-full cursor-pointer hover:opacity-80 focus:outline focus:outline-2 focus:outline-[#0CA5E9]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/x-icon.svg"
              height={12}
              width={12}
              alt=""
              aria-hidden
            />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={openFilePicker}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          aria-label="Browse or drop image"
          className={`flex flex-col items-center justify-center gap-y-2 cursor-pointer bg-gray-100 h-[180px] border rounded-md focus:outline focus:outline-2 focus:outline-[#0CA5E9] ${
            isDragging
              ? "border-dashed border-gray-600"
              : "border-solid border-transparent"
          }`}
        >
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/add-image-icon.svg"
              width={12}
              height={12}
              alt=""
              aria-hidden
            />
          </div>
          <h4 className="text-sm text-center text-[#121316]">
            Browse or Drop Image
          </h4>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        name="profileImage"
        accept="image/jpeg,image/png,image/webp,image/*"
        hidden
        onChange={handleFileChange}
      />
    </FormField>
  );
}
