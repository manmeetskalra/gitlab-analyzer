import {makeStyles} from "@material-ui/core/styles";

const useInnerNavStyle = makeStyles({
  selected: {},

  actionItemCode: {
    color: "#7553FF",
    "&$selected": {
      color: "#7553FF",
    },
  },

  actionItemComment: {
    color: "#7553FF",
    "&$selected": {
      color: "#7553FF",
    },
  },

  actionItemIssue: {
    color: "#7553FF",
    "&$selected": {
      color: "#7553FF",
    },
  },

  ul: {
    listStyleType: "none",
    fontSize: "20px",
    display: "flex",
    width: "30%",
    borderBottom: "2px solid rgb(195,195,195)",
    justifyContent: "center",
  },

  li: {
    display: "inline-block",
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingBottom: "1%",
    listStyle: "none",
    fontWeight: "bolded",
  },

  link: {
    textDecoration: "none",

    "&:visited": {
      color: "black",
    },
    "&:hover": {
      color: "red",
    },
  },
});
export { useInnerNavStyle };
