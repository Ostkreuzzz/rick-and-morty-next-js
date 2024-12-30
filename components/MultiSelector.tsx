import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  title: string;
  setValue: (value: string[]) => void;
  value: string[];
  items: string[];
}

export default function MultipleSelect({
  title,
  value,
  items,
  setValue,
}: Props) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
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
        id="demo-multiple-name-label"
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
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={title} />}
        MenuProps={MenuProps}
        className="text-white font-primary text-xl "
        sx={{
          "& .MuiSelect-icon": {
            color: "#5A698F",
          },
        }}
      >
        {items.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, value, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
