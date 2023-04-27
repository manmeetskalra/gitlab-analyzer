import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CodeIcon from "@material-ui/icons/Code";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import {useInnerNavStyle} from "../style/InnerNavStyle";

const InnerNavBar = (props) => {
  const { project_id, member_id } = useParams();
  const [value, setValue] = React.useState(0);
  const classes = useInnerNavStyle();
  const codeStyle = props.codeStyle;
  const commentStyle = props.commentStyle;
  const issueStyle = props.issueStyle;

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          classes={{
            root: codeStyle,
            selected: classes.selected,
          }}
          label="CODE"
          component={Link}
          to={`/overview/${project_id}/${member_id}/codecontribution`}
          value="code"
          icon={<CodeIcon />}
        />
        <BottomNavigationAction
          classes={{
            root: commentStyle,
            selected: classes.selected,
          }}
          label="COMMENT"
          component={Link}
          to={`/overview/${project_id}/${member_id}/commentcontribution`}
          value="comment"
          icon={<CommentOutlinedIcon />}
        />
        <BottomNavigationAction
          classes={{
            root: issueStyle,
            selected: classes.selected,
          }}
          label="ISSUE"
          component={Link}
          to={`/overview/${project_id}/${member_id}/issuecontribution`}
          value="issue"
          icon={<NoteOutlinedIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default InnerNavBar;
