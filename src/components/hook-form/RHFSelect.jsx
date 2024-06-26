import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";

const MenuProps = {
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

const RHFSelect = ({
  name,
  id,
  label,
  defaultValue,
  data,
  isEdit,
  ...other
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Select
                {...field}
                fullWidth
                disabled={
                  isEdit &&
                  (name === "productVariantId" || name === "productId")
                }
                labelId={id}
                label={label}
                value={field.value}
                // Todo
                onClose={() => {
                  setOpen(false);
                }}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}
                onOpen={() => setOpen(true)}
                open={open}
                displayEmpty={true}
                MenuProps={MenuProps}
                error={!!error}
                helpertext={error?.message}
                defaultValue={defaultValue}
                {...other}
              >
                {name !== "productVariantId" &&
                  data?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.path || item?.name}
                      </MenuItem>
                    );
                  })}
                {name === "productVariantId" &&
                  data?.map((item) =>
                    item?.variants.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          <Stack spacing={0.2}>
                            {Object.keys(item?.attributes).map((key) => (
                              <Typography key={key} variant="body2">
                                {key}: {item.attributes[key]}
                              </Typography>
                            ))}
                          </Stack>
                        </MenuItem>
                      );
                    })
                  )}
              </Select>
              <FormHelperText
                sx={{
                  color: (theme) => theme.palette.error.main,
                }}
              >
                {error?.message}
              </FormHelperText>
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default RHFSelect;
