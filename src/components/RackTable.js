import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ARRIS, HUMAX } from './../constants/constants.js'
import {getRack} from '../actions/action.js'
import {getRackStatus} from '../actions/action.js'
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class RackTable extends React.Component {z
  state = {
    open: false,
    age: '',
    platform:'Arris',
    rackname:''
  };

  componentWillMount(){
    this.props.getRack(this.props.platform)
    this.props.getRackStatus(this.props.platform, this.props.rackname)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.getRack(this.props.platform);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
        this.props.getRackStatus(this.props.platform, this.props.rackname)
  };

  render() {
    const { classes } = this.props;

    console.log(this.props.racks)
    let rackItems = this.props.rackNames.map((rack) =>
        <option key={rack}>{rack}</option>
    );

    return (
      <div className={classes.root}>
      <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Platform</InputLabel>
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
                <InputLabel htmlFor="age-native-simple"></InputLabel>
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
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { this.props.rackTable.map(rackState => {
              return (
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    {rackState.box_model}
                  </TableCell>
                  <TableCell numeric>{rackState.cpe_id}</TableCell>
                  <TableCell numeric>{rackState.cpe_id}</TableCell>
                  <TableCell numeric>{rackState.cpe_id}</TableCell>
                  <TableCell numeric>{rackState.cpe_id}</TableCell>
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
  rackNames:state.helloWorldReducer.rackNames,
  rackTable:state.helloWorldReducer.rackTable
})

export default withStyles(styles)(connect(mapStateToProps,{getRack, getRackStatus})(RackTable));
