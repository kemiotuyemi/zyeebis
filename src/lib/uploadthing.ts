import { createUploadthing } from "uploadthing/next";
import { generateUploadButton } from "@uploadthing/react";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { adminId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  receiptUpload: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { adminId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const UploadButton = generateUploadButton<OurFileRouter>();
