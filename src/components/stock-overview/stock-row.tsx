import { Grid } from "@mui/material";

export interface StockRowProps {
  label?: undefined | string | (JSX.Element & React.ReactNode);
  value?: undefined | string | (JSX.Element & React.ReactNode);
  [x: string]: any;
}

export function StockRow({ label, value, ...rest }: StockRowProps) {
  if (typeof label === "string") {
    // @ts-ignore
    value = <span aria-label={label}>{value}</span>;
    label = `${label}:`;
  }

  return (
    <>
      <Grid
        item
        xs={6}
        container
        justifyContent="flex-end"
        paddingRight={4}
        {...rest}
      >
        {label}
      </Grid>
      <Grid item xs={6} {...rest}>
        {value}
      </Grid>
    </>
  );
}
