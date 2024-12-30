"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  title: string;
  setValue: (value: string) => void;
  value: string;
  items: string[];
}

export default function Selector({ title, value, items, setValue }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl
      className="h-fit w-full text-light-blue font-primary"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#5A698F",
          transition: "border-color 300ms ease",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FC4747 !important",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FC4747",
        },
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        className="font-primary text-xl"
        sx={{
          color: "#5A698F",
          "&.Mui-focused": {
            color: "#FC4747",
          },
        }}
      >
        {title}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={title}
        onChange={handleChange}
        className="text-white font-primary text-xl "
        sx={{
          "& .MuiSelect-icon": {
            color: "#5A698F",
          },
        }}
      >
        <MenuItem value={0}>All</MenuItem>

        {items.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
