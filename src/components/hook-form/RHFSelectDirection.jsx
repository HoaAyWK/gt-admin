import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
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

const RHFSelectDirection = ({
  name,
  id,
  label,
  defaultValue,
  data,
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
                labelId={id}
                label={label}
                value={field.value}
                // Todo
                onClose={() => {
                  setOpen(false);
                }}
                onChange={(event) => field.onChange(event.target.value)}
                onOpen={() => setOpen(true)}
                open={open}
                displayEmpty={true}
                MenuProps={MenuProps}
                error={!!error}
                helpertext={error?.message}
                defaultValue={defaultValue}
                {...other}
              >
                {data?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
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

export default RHFSelectDirection;
