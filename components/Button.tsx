import React from "react";
import Button from "@mui/material/Button";

interface Props {
  isDisabled: boolean;
  title: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BasicButton({ title, isDisabled, handleClick }: Props) {
  return (
    <Button
      disabled={isDisabled}
      onClick={handleClick}
      variant="outlined"
      className="font-primary text-xl text-light-blue"
      sx={{
        backgroundColor: "#161d2f",
        borderColor: "#5A698F",
        color: "#5A698F",
        transition: "all 300ms ease",
        "&:hover": {
          backgroundColor: "#FC4747",
          borderColor: "#FC4747",
          color: "#FFFFFF",
        },
        "&.Mui-disabled": {
          backgroundColor: "#161d2f",
          borderColor: "#5A698F",
          color: "#5A698F",
          opacity: 0.6,
        },
      }}
    >
      {title}
    </Button>
  );
}
