"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toBase64 } from "@/lib/utils";
import { ImageIcon, LoaderCircle, PencilIcon } from "lucide-react";
import React from "react";

type AvatarUploadProps = {
  defaultValue?: string;
  isUploading?: boolean;
  onChange: (value: File[]) => void;
};

export function AvatarUpload({
  defaultValue,
  isUploading = false,
  onChange,
}: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(
    defaultValue
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let files: File[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      const file = e.target.files[0];
      const base64 = (await toBase64(file)) as string;
      setImageSrc(base64);
      onChange(files);
    }
  };

  return (
    <div className="relative w-40 h-40">
      <Avatar className="w-full h-full">
        {isUploading ? (
          <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center">
            <LoaderCircle className="w-20 h-20 animate-spin text-white/50" />
          </div>
        ) : null}
        <AvatarImage src={imageSrc} className="object-cover" />
        <AvatarFallback className="bg-secondary">
          <ImageIcon className="w-16 h-16" />
        </AvatarFallback>
      </Avatar>
      <Button
        variant="default"
        size="icon"
        className="rounded-full p-1 absolute bottom-0 right-0"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <PencilIcon className="w-4 h-4 text-white" />
      </Button>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
      />
    </div>
  );
}
