import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const StyledErrorWrapper = styled(Box)(({ theme }) => ({
  '& .error': {
    border: `1px dashed ${theme.palette.error.main} !important`,
  }
}));

export const StyledUploaderArea = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 250,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
}));

export const StyledDisplayUploader = styled(Box)(({ theme }) => ({
  lineHeight: 1,
  display: 'block',
  overflow: 'hidden',
  zIndex: 8,
  borderRadius: theme.shape.borderRadius,
  width: 'calc(100% - 16px)',
  height: 'calc(100% - 16px)',
  '&:hover': {
    opacity: 0.72,
  }
}));
