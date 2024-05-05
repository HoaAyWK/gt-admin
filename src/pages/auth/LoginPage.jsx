import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  Container,
  Typography,
  Stack,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useResponsive from "../../hooks/useResponsive";
import Page from "../../components/Page";
import LoginForm from "../../features/auth/login/LoginForm";
import ROLES from "../../constants/userRoles";
import { useAppThemeUpdate, useAppTheme } from "../../context/AppThemeContext";
import { useLocalStorage } from "../../hooks";
import Iconify from "../../components/iconify";
import { enqueueSnackbar } from "notistack";
import PATHS from "../../constants/paths";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const navigate = useNavigate();
  const [, setModeValueStored] = useLocalStorage("darkMode", null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkTheme = useAppTheme();
  const { setLightMode, setDarkMode } = useAppThemeUpdate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const mdUp = useResponsive("up", "md");

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role?.toLowerCase() === ROLES.ADMIN.toLowerCase()) {
        enqueueSnackbar("Login successfully", { variant: "success" });
        navigate(PATHS.DASHBOARD, { replace: true });
      } else {
        enqueueSnackbar("You don't have permission to access this page!", { variant: "error" });
      }
    }
  }, [isAuthenticated, user, navigate]);

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

  const applyLightMode = () => {
    setLightMode();
    setModeValueStored(false);
  };

  const applyDarkMode = () => {
    setDarkMode();
    setModeValueStored(true);
  };

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flexDirection="row">
              <img src="/new_hci_logo.svg" alt="logo" />
              <Typography variant="h4" sx={{ ml: 2, color: "text.primary" }}>
                EStore Management
              </Typography>
            </Stack>
          </Stack>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome back to the EStore Management
            </Typography>
            <img src="/static/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <Tooltip title={darkTheme ? "Light" : "Dark"}>
            <IconButton
              onClick={toggleTheme(darkTheme)}
              sx={{
                position: "absolute",
                top: 25,
                right: 20,
                color: "text.primary",
                zIndex: 10,
              }}
            >
              <Iconify icon={icon()} width={24} height={24} />
            </IconButton>
          </Tooltip>

          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Log in to the EStore Management
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Enter your details below.
            </Typography>

            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default Login;
