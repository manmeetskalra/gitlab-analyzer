import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import {useInnerNavStyle} from "../../style/InnerNavStyle";

const ScoreBreakdownNavbar = ({ codeStyle, commentStyle }) => {
  const { project_id, member_id } = useParams();
  const [value, setValue] = React.useState(0);
  const classes = useInnerNavStyle();

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
          label="DAY BY DAY"
          component={Link}
          to={`/overview/${project_id}/${member_id}/breakdown/day_by_day`}
          value="day_by_day"
          icon={<DateRangeIcon />}
        />
        <BottomNavigationAction
          classes={{
            root: commentStyle,
            selected: classes.selected,
          }}
          label="MERGE REQUESTS"
          component={Link}
          to={`/overview/${project_id}/${member_id}/breakdown/merge_requests`}
          value="merge_requests"
          icon={<MergeTypeIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default ScoreBreakdownNavbar;
