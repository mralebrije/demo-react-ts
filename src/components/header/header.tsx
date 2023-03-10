import {
  AppBar,
  Link,
  ToggleButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import "./header.scss";
import { FC } from "react";
import { techItems } from ".";
import { TechItem } from "../tech-item/tech-item";

export interface HeaderProps {
  isMockMode: boolean;
  setIsMockMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({
  isMockMode,
  setIsMockMode,
  isDarkMode,
  setIsDarkMode,
}) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <div className="header-title">
          <Typography variant="h5">Stock Comparison</Typography>
          <Link
            target="_blank"
            color="error"
            href="https://www.linkedin.com/in/xduranmtz/"
            sx={{ marginTop: "5px", mx: 1.5, display: "inline" }}
          >
            <Typography variant="subtitle1">by Sergio Durán </Typography>
          </Link>
        </div>

        <Tooltip
          title={
            "When MOCK API mode is enabled, the data results are pulled from a local source."
          }
        >
          <ToggleButton
            data-testid="header-btn-mock"
            color="primary"
            value="check"
            selected={isMockMode}
            onChange={() => {
              setIsMockMode(!isMockMode);
            }}
          >
            Mock API Mode
          </ToggleButton>
        </Tooltip>

        <Tooltip
          title={
            "When DARK mode is enabled, the UI colors of view components are adjusted."
          }
        >
          <ToggleButton
            data-testid="header-btn-theme"
            color="primary"
            value="check"
            selected={isDarkMode}
            onChange={() => {
              setIsDarkMode(!isDarkMode);
            }}
            sx={{ ml: 2 }}
          >
            Dark Mode
          </ToggleButton>
        </Tooltip>

        <Typography variant="subtitle1" sx={{ ml: 4 }}>
          <strong>Techs:</strong>
        </Typography>

        <nav className="tech-items-container">
          {techItems.map((item) => (
            <TechItem key={item.name} {...item} />
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
};
