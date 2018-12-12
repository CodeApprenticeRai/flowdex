import React, { Component } from 'react';
import "../stylesheets/sheet1.css";


class TableRow  extends Component {
  constructor(props){
    super(props);

    this.state = {
      sightingID: props.sighting.id,
      sighting: props.sighting,
      isBeingEdited: false
    };

    // this.onSubmit = this.onSubmit.bind(this);
    this.initiateEdit = this.initiateEdit.bind(this);
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    // this.confirmEdit = this.confirmEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  initiateEdit(event){
    let updatedState = this.state;
    updatedState.isBeingEdited = true;

    this.setState( updatedState );
    return
  }

  // on change of the field, set the value of the target element to be what the field was changed to
  handleFieldEdit(event){
    alert("!Changed: " + this.state.sighting[event.target.fieldname] + "to" + event.target.value );
    return;
  }
  // validate all fields,
  // if id exists on sighting create a put request where id is sightingID and the sighting object is the field bound values
  // confirmEdit(event){}

  handleCancelEdit(event){
    let updatedState = this.state;
    updatedState.isBeingEdited = false;

    this.setState( updatedState );
  }
  // onSubmit()

  render(){
    return(
    <tr class={this.state.isBeingEdited ? "table-warning" : "" } key={this.state.sighting.id}>
      <td contenteditable={this.state.isBeingEdited ? "true" : "false" } value={this.state.sighting.NAME} onChange={this.handleFieldEdit} fieldname='NAME'>{this.state.sighting.NAME}</td>
      <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.LOCATION}>{this.state.sighting.LOCATION}</td>
      <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.PERSON} >{this.state.sighting.PERSON}</td>
      <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.SIGHTED}>{this.state.sighting.SIGHTED}</td>
      { !this.state.isBeingEdited ?
          <button type="button" className="btn btn-light" onClick={this.initiateEdit}>Edit Sighting</button>
          :
          <>
          <button type="button" className="btn btn-success" >Confirm</button>
          <button type="button" className="btn btn-warning" onClick={this.handleCancelEdit}>Cancel</button>
          </>
      }
    </tr>
    );
  }
}

export default TableRow;

// <input contenteditable={this.state.isBeingEdited ? "true" : "false" } value={this.state.sighting.NAME} onChange={this.handleFieldEdit} fieldname='NAME'>{this.state.sighting.NAME}</input>
