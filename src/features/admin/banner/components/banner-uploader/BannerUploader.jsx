import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import imagesIllustration from '../../../../../assets/images/image_illustration.png';
import { StyledErrorWrapper, StyledDisplayUploader, StyledUploaderArea } from './styles';

const BannerUploader = ({ name, label, setValue, clearErrors }) => {
  const imageRef = useRef();
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { control } = useFormContext();

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setSelectedFile(file);
    setValue(name, file)
    clearErrors(name);
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    onDrop,
    maxFiles: 1
  });

  const handleClick = async () => {
    imageRef?.current?.click();
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);

      setImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <StyledErrorWrapper>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error }}) => (
          <>
            <StyledUploaderArea
              role='presentation'
              tabIndex={0}
              onClick={handleClick}
              className={error ? 'error' : ''}
              {...getRootProps()}
            >
              <input
                style={{ display: 'none' }}
                type='file'
                accept='image/*'
                ref={(instance) => {
                  field.ref(instance);
                  imageRef.current = instance;
                }}
                onChange={(event) => {
                  if (event.target.files) {
                    const file = event.target.files[0];
                    field.onChange(file);
                    handleSelectFile(file);
                  }
                }}
                {...getInputProps()}
              />
              <StyledDisplayUploader>
                {image ? (
                  <Box
                    component='img'
                    src={image}
                    alt='banner'
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                )
                  : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Stack spacing={2}>
                      <Box
                        component='img'
                        src={imagesIllustration}
                        alt='image'
                        sx={{
                          width: 180,
                          height: 150,
                          objectFit: 'cover'
                        }}
                      />
                        <Typography variant='subtitle1' textAlign='center' color='text.secondary'>Drag or select an image</Typography>
                      </Stack>
                    </Box>
                )}
              </StyledDisplayUploader>
            </StyledUploaderArea>
            <Typography variant='caption' color='error' sx={{ ml: 2 }}>
              {error?.message}
            </Typography>
            {fileRejections && (
                fileRejections[0]?.errors.map(error => (
                    <Typography key={error.code} variant='caption' color='error'>
                      {error?.message}
                    </Typography>
                  ))
                )
            }
          </>
        )}
      />
    </StyledErrorWrapper>
  );
};

export default BannerUploader;
