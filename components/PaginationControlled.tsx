import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  amount: number;
  setValue: (value: number) => void;
  value: number;
}

export default function PaginationControlled({
  amount,
  value,
  setValue,
}: Props) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack spacing={2} className="text-light-blue font-primary">
      <Pagination
        size="large"
        count={amount}
        page={value}
        onChange={handleChange}
        className="text-light-blue font-primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#5A698F",
            fontFamily: "inherit",
            transition: "color 300ms ease, border-color 300ms ease",
          },
          "& .MuiPaginationItem-page:hover": {
            color: "#FC4747",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#FC4747",
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#5A698F",
          },
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#FF5A5A",
          },
          "& .MuiPaginationItem-root.Mui-disabled": {
            color: "#9E9E9E",
          },
        }}
      />
    </Stack>
  );
}
