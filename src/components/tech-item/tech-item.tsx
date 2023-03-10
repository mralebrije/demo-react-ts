import { Link } from "@mui/material";
import "./tech-item.scss";
import { FC } from "react";

interface TechItemProps {
  href: string;
  name: string;
  src: string;
  alt: string;
}

export const TechItem: FC<TechItemProps> = ({ name, src, href, alt }) => {
  return (
    <span className="tech-item-container">
      <Link
        data-testid="item-link"
        target="_blank"
        variant="button"
        color="text.primary"
        href={href}
        sx={{ my: 1.5, mx: 1.5, display: "inline" }}
      >
        {name}
      </Link>
      <img src={src} alt={alt} width={36} height={36} />
    </span>
  );
};
