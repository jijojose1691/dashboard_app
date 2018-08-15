import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ARRIS, HUMAX } from './../constants/constants.js'
import {getRackNames} from '../actions/action.js'
import {getBoxList} from '../actions/action.js'
import {connect} from 'react-redux'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class RackTable extends React.Component {z
  state = {
    platform:'Arris',
    rackname:''
  };

  componentWillMount(){
    this.props.getRackNames(this.props.platform)
    this.props.getBoxList(this.props.rackname)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.getRackNames(this.props.platform);
  };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  //       this.props.getBoxList(this.props.platform, this.props.rackname)
  // };

  render() {
    const { classes } = this.props;

    console.log(this.props.rackNames)
    let rackItems = this.props.rackNames.map((rack) =>
        <option key={rack}>{rack}</option>
    );

    return (
      <div className={classes.root}>
      <FormControl className={classes.formControl}>
            <InputLabel>Platform</InputLabel>
            <Select
              native
              value={this.state.platform}
              onChange={this.handleChange('platform')}
              inputProps={{
                name: 'platform',
                id: 'platform',
              }}
            >
              <option value="" />
              <option value={ARRIS}>Arris</option>
              <option value={HUMAX}>Humax</option>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
                <InputLabel>Rack Name</InputLabel>
                <Select
                  native
                  value={this.state.rackname}
                  onChange={this.handleChange('rackname')}
                  inputProps={{
                    name: 'rackname',
                    id: 'rackname',
                  }}
                >
                {rackItems}
                </Select>
              </FormControl>


      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Slot</TableCell>
              <TableCell numeric>Slot ID</TableCell>
              <TableCell numeric>CPE ID</TableCell>
              <TableCell numeric>IP Address</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { this.props.rackTable.map(rackState => {
              return (
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    {rackState.rack_slot}
                  </TableCell>
                  <TableCell>{rackState.rack_slot_id}</TableCell>
                  <TableCell>{rackState.cpe_id}</TableCell>
                  <TableCell>{rackState.ip_address}</TableCell>
                  <TableCell>{rackState.box_status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

RackTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=state=>({
  rackNames:state.rackListReducer.rackNames,
  rackTable:state.rackListReducer.rackTable
})

export default withStyles(styles)(connect(mapStateToProps,{getRackNames, getBoxList})(RackTable));
