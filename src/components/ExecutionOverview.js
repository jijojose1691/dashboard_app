import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ARRIS, HUMAX } from "./../constants/constants.js";
import { getRackNames } from "../actions/action.js";
import { getExecOverviewByPlatform } from "../actions/action.js";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: "100%"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  cell: {
    "font-weight": 700,
    color: "black"
  }
});

class ExecutionOverview extends React.Component {
  z;
  state = {
    platform: "Arris"
  };

  componentWillMount() {
    this.props.getRackNames(this.state.platform);
    setTimeout(this.fetchExecOverviewByPlatform, 300);
  }

  handlePlatformChange = name => event => {
    this.setState({ platform: event.target.value });
    setTimeout(this.fetchExecOverviewByPlatform, 300);
  };

  fetchExecOverviewByPlatform = () => {
      this.props.getExecOverviewByPlatform(this.state.platform);
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Platform</InputLabel>
          <Select
            native
            value={this.state.platform}
            onChange={this.handlePlatformChange("platform")}
            inputProps={{
              name: "platform",
              id: "platform"
            }}
          >
            <option value="" />
            <option value={ARRIS}>Arris</option>
            <option value={HUMAX}>Humax</option>
          </Select>
        </FormControl>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Rack Name</TableCell>
                <TableCell className={classes.cell}>Testcase Number</TableCell>
                <TableCell className={classes.cell}>Build Version</TableCell>
                <TableCell className={classes.cell}>Passed on ( No. of Slots )</TableCell>
                <TableCell className={classes.cell}>Failed on ( No. of Slots )</TableCell>
                <TableCell className={classes.cell}>Running on ( No. of Slots )</TableCell>
              </TableRow>
            </TableHead>

            {this.props.execuionOverviewList !== undefined && this.props.execuionOverviewList.length > 0
              ? this.props.execuionOverviewList.map((execuionState, index) => {
                  return (
                    <TableBody key={index}>
                      <TableRow key={index}>
                        <TableCell><Link to={`/rackStatus?platform=${this.state.platform}&rackName=${execuionState.rack_name}`}>{execuionState.rack_name}</Link></TableCell>
                        <TableCell><Link to={`/rackExecutionStatus?platform=${this.state.platform}&rackName=${execuionState.rack_name}`}>{execuionState.test_case_number}</Link></TableCell>
                        <TableCell>{execuionState.execution_id}</TableCell>
                        <TableCell>{execuionState.passed_tests}</TableCell>
                        <TableCell>{execuionState.failed_tests}</TableCell>
                        <TableCell>{execuionState.running_tests}</TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })
              : null}
          </Table>
        </Paper>
      </div>
    );
  }
}

ExecutionOverview.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rackNames: state.boxInfoReducer.rackNames,
  execuionOverviewList: state.execOverviewReducer.execuionOverviewList
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getRackNames, getExecOverviewByPlatform }
  )(ExecutionOverview)
);
