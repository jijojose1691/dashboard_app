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
import { getBoxList } from "../actions/action.js";
import { connect } from "react-redux";

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

class RackTable extends React.Component {
  z;
  state = {
    platform: "Arris"
  };

  componentWillMount() {
    this.props.getRackNames(this.state.platform);
    setTimeout(this.fetchBoxList, 300);
  }

  handlePlatformChange = name => event => {
    this.setState({ platform: event.target.value });
    this.props.getRackNames(event.target.value);
    setTimeout(this.fetchBoxList, 300);
  };

  fetchBoxList = () => {
    if (this.props.rackNames !== undefined && this.props.rackNames.length > 0) {
      this.props.getBoxList(this.props.rackNames[0]);
    }
  };

  handleChange = name => event => {
    this.props.getBoxList(event.target.value);
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

        <FormControl className={classes.formControl}>
          <Select
            native
            onChange={this.handleChange("rackname")}
            inputProps={{
              name: "rackname",
              id: "rackname"
            }}
          >
            {this.props.rackNames !== undefined &&
            this.props.rackNames.length > 0
              ? this.props.rackNames.map((rack, index) => {
                  return (
                    <option
                      key={index}
                      value={rack}
                      defaultValue={this.props.rackNames[0]}
                    >
                      {rack}
                    </option>
                  );
                })
              : null}
          </Select>
        </FormControl>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Slot</TableCell>
                <TableCell className={classes.cell}>Slot ID</TableCell>
                <TableCell className={classes.cell}>CPE ID</TableCell>
                <TableCell className={classes.cell}>IP Address</TableCell>
                <TableCell className={classes.cell}>FTI State</TableCell>
              </TableRow>
            </TableHead>

            {this.props.boxList !== undefined && this.props.boxList.length > 0
              ? this.props.boxList.map((rackState, index) => {
                  return (
                    <TableBody key={index}>
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {rackState.rack_slot}
                        </TableCell>
                        <TableCell>{rackState.rack_slot_id}</TableCell>
                        <TableCell>{rackState.cpe_id}</TableCell>
                        <TableCell>{rackState.ip_address}</TableCell>
                        <TableCell>{rackState.box_status}</TableCell>
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

RackTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rackNames: state.boxInfoReducer.rackNames,
  boxList: state.boxInfoReducer.boxList
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getRackNames, getBoxList }
  )(RackTable)
);
