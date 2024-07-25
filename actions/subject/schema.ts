import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}

export const CreateSubject = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  description: z.string(),
  image: z.string(),
});
