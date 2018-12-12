import React, { Component } from 'react';
import "../stylesheets/sheet1.css";


class TableRow  extends Component {
  constructor(props){
    super(props);

    this.state = {
      sightingID: props.sighting.id,
      sighting: props.sighting,
      isBeingEdited: false,
    };

    // this.onSubmit = this.onSubmit.bind(this);
    this.initiateEdit = this.initiateEdit.bind(this);
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
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
    let fieldname = event.target.getAttribute('fieldname');
    let updatedState = this.state;

    updatedState.sighting[ fieldname ] = event.target.value;

    this.setState( updatedState );
    return;
  }


  handleCancelEdit(event){
    this.props.onSightingModificationConfirmed(event);

    // This should not have to run anymore
    let updatedState = this.state;
    updatedState.isBeingEdited = false;
    this.setState( updatedState );
    window.location.reload();
  }

  // validate all fields,
  // if id exists on sighting create a put request where id is sightingID and the sighting object is the field bound values
  // confirmEdit(event){}
  handleConfirmEdit(event){
    // validation is a pain

    let updatedState = this.state;
    updatedState.isBeingEdited = false;
    this.setState( updatedState );

    if ( (this.state.sightingID != null) && (this.state.sightingID != undefined) ){
        fetch('http://localhost:3003/sightings', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              sightingID: this.state.sightingID,
              sighting: this.state.sighting
            })
        })
        .then( res => res.text() )
        .then( res => console.log( res ) )
    }
    else {
      fetch('http://localhost:3003/sightings', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            sightingID: this.state.sightingID,
            sighting: this.state.sighting
          })
      })
      .then( res => res.text() )
      .then( res => console.log( res ) )

      this.props.onSightingModificationConfirmed(event);
      window.location.reload();
    }

    // then pass state up to let it be known that we should re-render the table

  }

  render(){
    if ( (this.state.sightingID != null) && (this.state.sightingID != undefined) ){
      return(
      <tr class={this.state.isBeingEdited ? "table-warning" : "" } key={this.state.sighting.id}>
          <td><input type="text" class="form-control" fieldname="NAME" value={this.state.sighting.NAME} disabled={ !this.state.isBeingEdited }  onChange={this.handleFieldEdit}/></td>
          <td><input type="text" class="form-control"  fieldname="LOCATION" value={this.state.sighting.LOCATION} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
          <td><input type="text" class="form-control" fieldname="PERSON" value={this.state.sighting.PERSON} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
          <td><input type="text" class="form-control" fieldname="SIGHTED" value={this.state.sighting.SIGHTED} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
        { !this.state.isBeingEdited ?
            <button type="button" className="btn btn-light" onClick={this.initiateEdit}>Edit Sighting</button>
            :
            <>
            <input type="submit" className="btn btn-success" onClick={this.handleConfirmEdit} value="Confirm"/>
            <input type="cancel" className="btn btn-warning" onClick={this.handleCancelEdit} value="Cancel"/>
            </>
        }
      </tr>
      );
    } else {
      return(
        <tr class={this.state.isBeingEdited ? "table-warning" : "" } key={this.state.sighting.id}>
            <td><input type="text" class="form-control" fieldname="NAME" value={this.state.sighting.NAME} disabled={ !this.state.isBeingEdited }  onChange={this.handleFieldEdit}/></td>
            <td><input type="text" class="form-control"  fieldname="LOCATION" value={this.state.sighting.LOCATION} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
            <td><input type="text" class="form-control" fieldname="PERSON" value={this.state.sighting.PERSON} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
            <td><input type="text" class="form-control" fieldname="SIGHTED" value={this.state.sighting.SIGHTED} disabled={ !this.state.isBeingEdited } onChange={this.handleFieldEdit}/></td>
          { !this.state.isBeingEdited ?
              <button type="button" className="btn btn-light" onClick={this.initiateEdit}>Create New Sighting</button>
              :
              <>
              <input type="submit" className="btn btn-success" onClick={this.handleConfirmEdit} value="Confirm"/>
              <input type="cancel" className="btn btn-warning" onClick={this.handleCancelEdit} value="Cancel"/>
              </>
          }
        </tr>
      );
    }
  }
}

export default TableRow;

// <input contenteditable={this.state.isBeingEdited ? "true" : "false" } value={this.state.sighting.NAME} onChange={this.handleFieldEdit} fieldname='NAME'>{this.state.sighting.NAME}</input>

// <td contenteditable={this.state.isBeingEdited ? "true" : "false" } value={this.state.sighting.NAME} onChange={this.handleFieldEdit} fieldname='NAME'>{this.state.sighting.NAME}</td>
// <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.LOCATION}>{this.state.sighting.LOCATION}</td>
// <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.PERSON} >{this.state.sighting.PERSON}</td>
// <td contenteditable={this.state.isBeingEdited ? "true" : "false"} value={this.state.sighting.SIGHTED}>{this.state.sighting.SIGHTED}</td>
