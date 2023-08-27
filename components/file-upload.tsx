"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface FileUploadProps {    
  onChange: (url?: String) => void;
  value: String;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if( value && fileType !== "pdf" ){
        return (
            <div className="relative w-32 h-32">
                <Image 
                    src={value}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
                <button
                    className="absolute top-0 right-0 p-1 bg-red-800 rounded-full text-white"
                    type="button"
                    onClick={() => onChange("")}
                >
                    <X size={20} />
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
        }}
        onUploadError={
            (error: Error) => {
                console.log(error);
            }
        }
    />
  );
};
