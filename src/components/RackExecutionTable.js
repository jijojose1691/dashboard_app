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
import { getExecByRack } from "../actions/action.js";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import failed from "../static/images/failed.jpg";
import inProgess from "../static/images/in_progress.jpg";
import Passed from "../static/images/Passed.jpg";
import scheduled from "../static/images/scheduled.jpg";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    flexWrap: "wrap",
    overflow: "hidden"
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
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    height: 200,
    width: 350
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 105,
    width: 350
  },
  media: {
    height: 200
  }
});

class RackExecutionTable extends React.Component {
  z;
  state = {
    platform: "Arris"
  };

  componentWillMount() {
    this.props.getRackNames(this.state.platform);
    setTimeout(this.fetchRackExec, 300);
  }

  handlePlatformChange = name => event => {
    this.setState({ platform: event.target.value });
    this.props.getRackNames(event.target.value);
    setTimeout(this.fetchRackExec, 300);
  };

  fetchRackExec = () => {
    if (this.props.rackNames !== undefined && this.props.rackNames.length > 0) {
      this.props.getExecByRack(this.props.rackNames[0]);
    }
  };

  handleChange = name => event => {
    this.props.getExecByRack(event.target.value);
  };

  render() {
    const { classes, theme } = this.props;
    const { spacing } = "16";

    return (
      <Grid container className={classes.root} spacing={16}>
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
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={40}
            >
              <Grid item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={scheduled}
                    title="Scheduled"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="display2">
                      0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={inProgess}
                    title="In Progress"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="display2">
                      4
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={Passed}
                    title="Passed"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="display2">
                      2
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={failed}
                    title="Failed"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="display2">
                      2
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Slot ID</TableCell>
                  <TableCell>Test Case Number</TableCell>
                  <TableCell>Started At</TableCell>
                  <TableCell>Test Status</TableCell>
                  <TableCell>Ended At</TableCell>
                  <TableCell>Duration(Sec)</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Core Dump Presence</TableCell>
                </TableRow>
              </TableHead>

              {this.props.rackExecuionList !== undefined &&
              this.props.rackExecuionList.length > 0
                ? this.props.rackExecuionList.map(
                    (rackExecuionState, index) => {
                      return (
                        <TableBody key={index}>
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {rackExecuionState.rack_slot_id}
                            </TableCell>
                            <TableCell>
                              {rackExecuionState.test_case_number}
                            </TableCell>
                            <TableCell>
                              {rackExecuionState.started_at}
                            </TableCell>
                            <TableCell>
                              {rackExecuionState.test_status}
                            </TableCell>
                            <TableCell>{rackExecuionState.ended_at}</TableCell>
                            <TableCell>
                              {rackExecuionState.elapsed_time}
                            </TableCell>
                            <TableCell>{rackExecuionState.remark}</TableCell>
                            <TableCell>
                              {rackExecuionState.core_dump_presence}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    }
                  )
                : null}
            </Table>
          </Paper>
        </div>
      </Grid>
    );
  }
}

RackExecutionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rackNames: state.rackExecInfoReducer.rackNames,
  rackExecuionList: state.rackExecInfoReducer.rackExecuionList
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { getRackNames, getExecByRack }
  )(RackExecutionTable)
);
