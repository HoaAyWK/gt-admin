// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
// utils
// components
import { Iconify } from "../../../components";
//
import { AccountPopover, NotificationPopover } from "../../common/header";
import {
  useAppThemeUpdate,
  useAppTheme,
} from "../../../context/AppThemeContext";
import { useLocalStorage, useResponsive } from "../../../hooks";
import PATHS from "../../../constants/paths";

// ----------------------------------------------------------------------
const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;

const StyledRoot = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "miniDrawer",
})(({ theme, miniDrawer }) => ({
  boxShadow: "none",
  width: `100%`,
  WebkitBackdropFilter: "blur(6px)",
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    ...(miniDrawer && {
      width: `calc(100% - (${theme.spacing(10)} + 1px))`,
    }),
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
}));

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    icon: "eva:home-outline",
    path: PATHS.DASHBOARD,
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: PATHS.PROFILE,
  },
  {
    label: "Password",
    icon: "eva:lock-fill",
    path: PATHS.PASSWORD,
  },
];

export default function AdminHeader({ user, openDesktopNav, onOpenMobileNav }) {
  const [, setModeValueStored] = useLocalStorage("darkMode", null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDesktop = useResponsive("up", "lg");

  const darkTheme = useAppTheme();
  const { setLightMode, setDarkMode } = useAppThemeUpdate();

  const applyLightMode = () => {
    setLightMode();
    setModeValueStored(false);
  };

  const applyDarkMode = () => {
    setDarkMode();
    setModeValueStored(true);
  };

  const toggleTheme = (isDark) => () => {
    if (isDark === null) {
      if (prefersDarkMode) {
        applyLightMode();
      } else {
        applyLightMode();
      }
    } else if (isDark === false) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  };

  const icon = () => {
    if (darkTheme === null) {
      if (prefersDarkMode) return "ic:twotone-light-mode";
      else return "material-symbols:dark-mode";
    } else if (darkTheme === false) {
      return "material-symbols:dark-mode";
    } else {
      return "ic:twotone-light-mode";
    }
  };

  return (
    <StyledRoot miniDrawer={isDesktop && !openDesktopNav}>
      <StyledToolbar>
        <IconButton
          onClick={onOpenMobileNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ mr: 2 }}></Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Tooltip title={darkTheme ? "Light" : "Dark"}>
            <IconButton onClick={toggleTheme(darkTheme)}>
              <Iconify icon={icon()} width={24} height={24} />
            </IconButton>
          </Tooltip>
          {user && (
            <NotificationPopover />
          )}
          <AccountPopover user={user} menuOptions={MENU_OPTIONS} />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
