import {makeStyles} from "@material-ui/core";

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginRight: theme.spacing(65),
  },
  icons: {
    backgroundColor: "none",
  },
}));