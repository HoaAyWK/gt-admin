import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormContext, Controller } from 'react-hook-form';

const RHFDateTimePicker = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...rest }, fieldState: { error }}) =>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={onChange}
          {...rest}
          {...other}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              error: !!error,
              helperText: error?.message,
            }
          }}
        />
      </LocalizationProvider>}
    />
  );
};

export default RHFDateTimePicker;
