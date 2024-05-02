import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '../../../components';

import { fToNow } from '../../../utils/formatTime';
import orderIcon from '../../../assets/icons/ic_notification_package.svg';
import shippingIcon from '../../../assets/icons/ic_notification_shipping.svg';

const renderContent = (notification) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.message}
    </Typography>
  );

  if (notification.domain === 'Orders') {
    return {
      avatar: <img alt={notification.message} src={orderIcon} />,
      title,
    };
  }

  if (notification.domain === 'Shipping') {
    return {
      avatar: <img alt={notification.message} src={shippingIcon} />,
      title,
    };
  }

  return {
    avatar: notification.avatar ? <img alt={notification.message} src={notification.avatar} /> : null,
    title,
  };
}

const NotificationItem = ({ notification }) => {
    const { avatar, title } = renderContent(notification);
    const navigate = useNavigate();

    const handleClick = async () => {
      const actionResult = await dispatch(markNotificationAsRead(notification.id));
      const result = unwrapResult(actionResult);

      if (result.success) {
        if (notification.domain === 'Order') {
          const url = `/orders/${notification.entityId}`;
          navigate(url);
        }
        return;
      }

      if (result.errors) {
        const errorKeys = Object.keys(result.errors);
        errorKeys.forEach((key) => {
          result.errors[key].forEach(error => {
            enqueueSnackbar(error, { variant: "error" });
          }
        )});

        return;
      }

      enqueueSnackbar(result.error, { variant: "error" });
    };

    return (
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(!notification.isRead && {
            bgcolor: 'action.selected',
          }),
        }}
        onClick={handleClick}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.timestamp)}
            </Typography>
          }
        />
      </ListItemButton>
    );
};

export default NotificationItem;
