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
    platform:'Arris'
  };

  componentWillMount(){
    this.props.getRackNames(this.state.platform)

    if((this.props.rackNames!==undefined)&&(this.props.rackNames.length>0) ){
      console.log('inside if')
    this.props.getBoxList(this.props.rackNames[0])
    }

  }


  handlePlatformChange=name =>async event=> {
       this.setState({ 'platform': event.target.value });
      const rackNam=await this.props.getRackNames(event.target.value);
       console.log("inide platformchange",rackNam);
    //
    //   if((this.props.rackNames!=undefined)&&(this.props.rackNames.length>0) ){
    //     console.log('inside handlePlatformChange',this.props.rackNames[0])
    //   this.props.getBoxList(this.props.rackNames[0])
    // }
      console.log('rackname',rackNam)
  };


  handleChange=name => event => {

    // this.setState({ [name]: event.target.value });
      console.log('rackname',event.target.value)

    // this.props.getRackNames(event.target.value);
    this.props.getBoxList(event.target.value)

  };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  //       this.props.getBoxList(this.props.platform, this.props.rackname)
  // };

  render() {
    const { classes } = this.props;

    // let rackItems = this.props.rackNames.map((rack) =>
    // // {   console.log('rack',rack);
    //     <option value={rack}>{rack}</option>
    // );

     console.log('rackItems',this.props.rackNames)

    return (
      <div className={classes.root}>
      <FormControl className={classes.formControl}>
            <InputLabel>Platform</InputLabel>
            <Select
              native
              value={this.state.platform}
              onChange={this.handlePlatformChange('platform')}
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

                <Select
                  native

                  onChange={this.handleChange('rackname')}
                  inputProps={{
                    name: 'rackname',
                    id: 'rackname',
                  }}
                >
                {(this.props.rackNames!==undefined)&&(this.props.rackNames.length>0)?
                (this.props.rackNames.map((rack, index) => {
                         return <option key={index} value={rack} defaultValue={this.props.rackNames[0]}>{rack}</option>
                       })):(null)}

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
                <TableRow key={rackState.id}>
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
  rackTable:state.boxListReducer.rackTable
})

export default withStyles(styles)(connect(mapStateToProps,{getRackNames, getBoxList})(RackTable));
