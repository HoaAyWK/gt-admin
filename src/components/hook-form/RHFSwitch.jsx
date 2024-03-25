import React from 'react';
import { FormControl, FormLabel, Switch } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const RHFRadioGroup = ({ name, id, label, ...other }) => {
    const { control } = useFormContext();
    return (
      <FormControl>
          <FormLabel id={id}>{label}</FormLabel>
          <Controller
              name={name}
              control={control}
              render={({ field }) => (
                  <Switch
                    {...field}
                    {...other}
                    defaultChecked={field.value}
                  />
              )}
          />
      </FormControl>
    )
};

export default RHFRadioGroup;
