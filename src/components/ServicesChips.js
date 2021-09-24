import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends React.Component {

  state = {
    name: [],
    service: [],
  };

  handleChange = event => {
    // this.setState({ name: event.target.value });
    this.setState({ service: event.target.value }, ()=>{
      this.props.onSelected(this.state.service);
    });

  };

  render() {

    const { classes, theme } = this.props;
    const services = this.props.services;

    return (
      <Grid container alignItems="center" justify="center" spacing={5}>
        <Grid item xs={10} sm={10} md={8} lg={8} xl={8} >

 
    
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel htmlFor="select-multiple-chip">Services</InputLabel>
              <Select
                multiple
                // value={this.state.name}
                value={this.state.service}
                onChange={this.handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value.name} label={value.name} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {services.map(service => (
                  <MenuItem
                    key={service.name}
                    value={service}
                    style={{
                      fontWeight:
                        // this.state.name.indexOf(name) === -1
                        this.state.service.indexOf(service) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </Grid>
      </Grid>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
