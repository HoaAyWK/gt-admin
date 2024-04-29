import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import { v4 as uuidv4 } from "uuid";
import { uploadTaskPromise } from "../../utils/uploadTaskPromise";
import { styled } from "@mui/material/styles";
import ImageUploader from "quill-image-uploader";

import "react-quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageUploader", ImageUploader);

const StyledBox = styled(Box)(({ theme }) => ({
  "& .quill .ql-container": {
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: `theme.shape.borderRadius !important`,
  },
  "& .quill .ql-toolbar": {
    border: `1px solid ${theme.palette.divider} !important`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  "& .quill .ql-picker": {
    borderRadius: `theme.shape.borderRadius !important`,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  },
  "& .error .ql-container": {
    border: `1px solid ${theme.palette.error.main}`,
  },
}));

function RHFEditorV2({ name, label, initialContent, actionStatus, ...other }) {
  const { control } = useFormContext();

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "blockquote",
    "list",
    "link",
    "image",
  ];

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: "center" }, { align: "right" }, { align: "justify" }],
        [
          {
            font: [
              "Arial",
              "Courier",
              "Georgia",
              "Impact",
              "Lucida Console",
              "Tahoma",
              "Times New Roman",
            ],
          },
        ],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const filePath = `file/descriptionEditor/${uuidv4()}`;
          const url = await uploadTaskPromise(filePath, file);
          return url;
        },
      },
    }),
    []
  );
  return (
    <StyledBox>
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Box>

      <Controller
        name={name}
        control={control}
        defaultValue={initialContent}
        render={({ field, fieldState: { error } }) => {
          return (
            <Box className={error ? "error" : ""}>
              <ReactQuill
                value={field.value}
                onChange={field.onChange}
                onKeyUp={(event) => event.stopPropagation()}
                id={name}
                formats={formats}
                modules={modules}
              />

              {error && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 1, ml: 2 }}
                >
                  {error.message}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    </StyledBox>
  );
}

export default RHFEditorV2;
