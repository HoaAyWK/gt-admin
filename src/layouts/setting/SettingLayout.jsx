import {
  Grid,
  Avatar,
  Box,
  Link,
  Typography,
  useMediaQuery,
  Stack,
  Tooltip,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import { Iconify } from "../../components";
import { NavSection } from "../../components";
import { useLocalStorage } from "../../hooks";
import { useAppTheme, useAppThemeUpdate } from "../../context/AppThemeContext";
import { AccountPopover } from "../common/header";
import hciLogo from "/new_hci_logo.svg";
import PATHS from "../../constants/paths";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const HEADER_MOBILE = 64;

const StyledTextLogo = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(.25turn, #7F0E0E, #0F0D73)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const navConfig = [
  {
    title: "profile",
    path: PATHS.PROFILE,
    icon: getIcon("eva:person-outline"),
  },
  {
    title: "password",
    path: PATHS.PASSWORD,
    icon: getIcon("mdi:password"),
  },
];

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

export const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 1),
}));


export default function SettingLayout(props) {
  const { user } = useSelector((state) => state.auth);
  const [, setModeValueStored] = useLocalStorage("darkMode", null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
    <>
      <StyledToolbar>
        <Link
          component={RouterLink}
          to={PATHS.DASHBOARD}
          underline="none"
          sx={{ display: "inline-flex", alginItems: "center" }}
        >
          <Box component="img" alt="Logo" src={hciLogo} sx={{ mr: 1 }} />
          <StyledTextLogo variant="h3" component="h1">
            EStore
          </StyledTextLogo>
        </Link>
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
          <AccountPopover user={user} menuOptions={MENU_OPTIONS} />
        </Stack>
      </StyledToolbar>
      <Grid container spacing={1} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4} lg={3}>
          <Box
            component="nav"
            sx={{
              flexShrink: { lg: 0 },
              width: "100%",
            }}
          >
            <Box sx={{ mb: 5, mx: 2.5 }}>
              <Link underline="none">
                <StyledAccount>
                  <Avatar src={user?.avatarUrl} />

                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.primary", mb: -0.5 }}
                    >
                      {`${user?.firstName} ${user?.lastName}`}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </StyledAccount>
              </Link>
            </Box>

            <NavSection data={navConfig} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          {props.children}
        </Grid>
      </Grid>
    </>
  );
}
