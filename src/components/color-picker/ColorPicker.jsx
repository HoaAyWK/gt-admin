import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SketchPicker } from 'react-color';

const StyledColorPicker = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(0.5),
  display: 'inline-block',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

const StyledPickerPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '100%',
  bottom: '16px',
  '& .sketch-picker': {
    background: `${theme.palette.background.default} !important`,
    color: theme.palette.text.primary,
    boxShadow: `${theme.shadows[4]} !important`,
  }
}));

const ColorPicker = ({ color, onColorChange, open, handleOpen, handleClose }) => {
  const handleColorChange = (color) => {
    onColorChange(color);
  };

  return (
    <>
      <StyledColorPicker onClick={handleOpen}>
        <Box
          sx={{
            width: '28px',
            height: '16px',
            borderRadius: 0.2,
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
          }}
        />
      </StyledColorPicker>
      {open && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={handleClose}
          />
          <Box sx={{ position: 'relative', zIndex: 1301 }}>
            <StyledPickerPanel>
              <SketchPicker color={color} onChange={handleColorChange} />
            </StyledPickerPanel>
          </Box>
        </>
      )}
    </>
  );
};

export default ColorPicker;
