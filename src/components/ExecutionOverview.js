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
import { getRackNames,getExecOverviewByPlatform } from "../actions/action.js";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import failed from "../static/images/failed.jpg";
import inProgess from "../static/images/in_progress.jpg";
import Passed from "../static/images/Passed.jpg";
import scheduled from "../static/images/scheduled.jpg";

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
                    {this.props.rackExecuionList !== undefined &&
                    this.props.rackExecuionList.length > 0
                      ? this.props.rackExecuionList.filter(
                          rackExecuionState =>
                            rackExecuionState.test_status === "SCHEDULED"
                        ).length
                      : 0}
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
                    {this.props.rackExecuionList !== undefined &&
                    this.props.rackExecuionList.length > 0
                      ? this.props.rackExecuionList.filter(
                          rackExecuionState =>
                            rackExecuionState.test_status === "In Progress"
                        ).length
                      : 0}
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
                    {this.props.rackExecuionList !== undefined &&
                    this.props.rackExecuionList.length > 0
                      ? this.props.rackExecuionList.filter(
                          rackExecuionState =>
                            rackExecuionState.test_status === "PASS"
                        ).length
                      : 0}
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
                    {this.props.rackExecuionList !== undefined &&
                    this.props.rackExecuionList.length > 0
                      ? this.props.rackExecuionList.filter(
                          rackExecuionState =>
                            rackExecuionState.test_status === "FAIL"
                        ).length
                      : 0}
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
