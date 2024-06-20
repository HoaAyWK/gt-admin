import React from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Iconify } from "../../../components";

import { fToNow } from "../../../utils/formatTime";
import orderIcon from "../../../assets/icons/ic_notification_package.svg";
import shippingOutIcon from "../../../assets/images/shipingout.png";
import orderCompletedIcon from "../../../assets/images/ordercompleted.jpg";
import orderReceivedIcon from "../../../assets/images/orderreceive.webp";
import paymentConfirmedIcon from "../../../assets/images/paymentconfirm.webp";
import inTrasitIcon from "../../../assets/images/intrasit.webp";
import { markNotificationAsRead } from "../../../features/common/notificationSlice";

const renderContent = (notification) => {
  const title = (
    <Typography variant="subtitle2">{notification.message}</Typography>
  );

  if (notification.type === "OrderShippedOut") {
    return {
      avatar: <img alt={notification.message} src={shippingOutIcon} />,
      title,
    };
  }

  if (notification.type === "InTransit") {
    return {
      avatar: <img alt={notification.message} src={inTrasitIcon} />,
      title,
    };
  }

  if (notification.type === "OrderReceived") {
    return {
      avatar: <img alt={notification.message} src={orderReceivedIcon} />,
      title,
    };
  }

  if (notification.type === "PaymentInfoConfirmed") {
    return {
      avatar: <img alt={notification.message} src={paymentConfirmedIcon} />,
      title,
    };
  }

  if (notification.type === "OrderCompleted") {
    return {
      avatar: <img alt={notification.message} src={orderCompletedIcon} />,
      title,
    };
  }

  return {
    avatar: notification.avatar ? (
      <img alt={notification.message} src={notification.avatar} />
    ) : null,
    title,
  };
};

const NotificationItem = ({ notification, onClose }) => {
  const { avatar, title } = renderContent(notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const actionResult = await dispatch(
      markNotificationAsRead(notification.id)
    );
    const result = unwrapResult(actionResult);

    if (result.success) {
      if (notification.domain === "Order") {
        const url = `/orders/${notification.entityId}`;
        onClose();
        navigate(url);
      }
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
      });

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.isRead && {
          bgcolor: "action.selected",
        }),
      }}
      onClick={handleClick}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.timestamp)}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NotificationItem;
