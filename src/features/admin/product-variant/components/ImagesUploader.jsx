import React, { useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';

import uploadFile from '../../../../assets/images/upload-file.png';
import { useEffect, useRef, useState } from 'react';
import { Iconify } from '../../../../components';
import ACTION_STATUS from '../../../../constants/actionStatus';

const StyledErrorWrapper = styled(Box)(({ theme }) => ({
  '& .error': {
    backgroundColor: `${alpha(theme.palette.error.main, 0.16)} !important`
  }
}));

const StyledUploaderArea = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 250,
  cursor: 'pointer',
  overflow: 'hidden',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  backgroundColor: theme.palette.background.neutral,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    opacity: 0.72
  },
}));

const StyledPreviewImage = styled(Box)(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  objectFit: 'cover',
}));

const ImagesUploader = ({ name, getValues, setValue, clearErrors, actionStatus, ...other }) => {
  const { control } = useFormContext();
  const imageRef = useRef();
  const [files, setFiles]  = useState([]);
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const currentValue = getValues(name);
    const files = Array.from(acceptedFiles);
    const idFiles = files.map((file) => ({ id: uuidv4(), file }));

    if (currentValue) {
      setValue(name, [...currentValue, ...idFiles]);
    } else {
      setValue(name, [...idFiles]);
    }
    setFiles(idFiles);
    clearErrors(name);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    onDrop
  });

  useEffect(() => {
    const defaultImages = getValues(name);
    if (defaultImages) {

      setImages(defaultImages);
    }
    return () => images.map((image) => URL.revokeObjectURL(image.url));
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      const imagesArray = files.map((image) => {
        const { id, file } = image;
        const fileObjectURL = URL.createObjectURL(file);

        return { id, url: fileObjectURL };
      });

      setImages(prev => prev.concat(imagesArray));
    }
  }, [files]);

  useEffect(() => {
    if (actionStatus === ACTION_STATUS.SUCCEEDED) {
      setFiles([]);
      setValue(name, []);
    }
  }, [actionStatus])

  const handleClick = () => {
    imageRef?.current?.click();
  };

  const handleClickClose = (image) => () => {
    const currentValue = getValues(name);

    if (image.url) {
      setValue(name, currentValue.filter((value) => value.id !== image.id));
      URL.revokeObjectURL(image.url);
      setImages(prev => prev.filter((prevImage) => prevImage.id !== image.id));
    }

    setValue(name, currentValue.filter((value) => value !== image));
    setImages(prev => prev.filter((prevImage) => prevImage !== image));
  };

  const handleClickRemoveAll = () => {
    images.map((image) => {
      if (image.url) {
        URL.revokeObjectURL(image.url)
      }
    });
    setFiles([]);
    setImages([]);
    setValue(name, []);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledErrorWrapper>
          <StyledUploaderArea
            role='presentation'
            tabIndex={-1}
            onClick={handleClick}
            className={error  ? 'error' : ''}
            {...getRootProps()}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input
                style={{ display: 'none' }}
                type='file'
                accept='image/*'
                multiple
                ref={(instance) => {
                  field.ref(instance);
                  imageRef.current = instance;
                }}
                onChange={(event) => {
                  if (event.target.files) {
                    const files = Array.from(event.target.files);
                    const idFiles = files.map((file) => ({ id: uuidv4(), file }));

                    setFiles(idFiles);
                    field.onChange([...field.value, ...idFiles]);
                  }
                }}
                {...getInputProps()}
              />
              <Box
                sx={{
                  width: 188,
                  height: 188,
                  objectFit: 'cover'
                }}
                component='img'
                src={uploadFile}
                alt='file upload'
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  xs: {
                    justifyContent: 'center'
                  },
                  md: {
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Typography variant='h5' compoennt='span'>
                  Select or Drop file
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  Drop files here or click browse through your machine
                </Typography>
              </Box>
            </Box>
          </StyledUploaderArea>
          {error && (
            <Typography variant='caption' color='error'>
              {error?.message}
            </Typography>
          )}
          {isDragReject && (
            <Typography variant='caption' color='error'>
              Only allowed *.jpeg, *jpg, *.png
            </Typography>
          )}
          {images.length > 0 && (
            <>
              <Stack direction='row' sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {images.map((image) => (
                  <Box
                    key={image.url ? image.url : image}
                    sx={{
                      position: 'relative',
                      m: 1
                    }}
                  >
                    <StyledPreviewImage
                      component='img'
                      alt='image'
                      src={image.url ? image.url : image}
                      loading='lazy'
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                      }}
                      size='small'
                      color='error'
                      onClick={handleClickClose(image)}
                    >
                      <Iconify icon='material-symbols:close-rounded' width={20} height={20} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2
                }}
              >
                <Button variant='outlined' color='inherit' onClick={handleClickRemoveAll}>
                  Remove all
                </Button>
              </Box>
            </>
          )}
        </StyledErrorWrapper>
      )}
    />
  );
};

export default ImagesUploader;
