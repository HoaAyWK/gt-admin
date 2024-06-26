import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { styled } from "@mui/material/styles";
//
import AdminHeader from "./header";
import AdminNavbar from "./navbar";
import { useLocalStorage, useResponsive } from "../../hooks";
import { Loading } from "../../components";
import { setHubConnection, addNewNotification } from "../../features/common/notificationSlice";
import { createNotificationsHub } from "../../services/hubs";

// ----------------------------------------------------------------------
const NAV_WIDTH = 280;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  position: "relative",
  // overflow: 'auto'
});

const Main = styled("div", {
  shouldForwardProp: (prop) => prop !== "miniDrawer",
})(({ theme, miniDrawer }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  position: "absolute",
  right: 0,
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: `calc(100% - (${NAV_WIDTH}px + 1px))`,
    ...(miniDrawer && {
      width: `calc(100% - (${theme.spacing(12)} + 1px))`,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const isDesktop = useResponsive("up", "lg");
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken');
  const [openDesktopNav, setOpenDesktopNav] = useState(true);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { hubConnection } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (accessToken && user) {
      dispatch(setHubConnection(createNotificationsHub(accessToken)));
    } else {
      dispatch(setHubConnection(null));
    }
  }, [user]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.start()
        .then(() => {
          console.log('Connection established');
        })
        .catch(err => console.error('Error while establishing connection:', err));

      hubConnection.on('ReceiveNotification', (notification) => {
        console.log('Notification received:', notification);
      });

      hubConnection.on('NotifyAdminWhenOrderStatusChange', (notification) => {
        console.log(notification);
        dispatch(addNewNotification(notification));
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.stop()
          .then(() => console.log('Connection stopped'))
          .catch(err => console.error('Error while stopping connection:', err));
      }
    }
  }, [hubConnection]);

  const handleToggleDesktopNav = () => {
    setOpenDesktopNav((prev) => !prev);
  };

  const handleOpenMobileNav = () => {
    setOpenMobileNav(true);
  };

  const handleCloseMobileNav = () => {
    setOpenMobileNav(false);
  };

  const handleToggleMobileNav = () => {
    setOpenMobileNav((prev) => !prev);
  };

  return (
    <StyledRoot>
      <AdminHeader
        user={user}
        openDesktopNav={openDesktopNav}
        onOpenMobileNav={handleOpenMobileNav}
      />

      <AdminNavbar
        isDesktop={isDesktop}
        openDesktopNav={openDesktopNav}
        openMobileNav={openMobileNav}
        onCloseMobileNav={handleCloseMobileNav}
        onToggleDesktopNav={handleToggleDesktopNav}
        onToggleMobileNav={handleToggleMobileNav}
      />

      <Main miniDrawer={isDesktop && !openDesktopNav}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Main>
    </StyledRoot>
  );
}
