import React, { Component } from 'react';
import "../stylesheets/sheet1.css";
import TableRow from "./TableRow";

class IndexEditor extends Component {
  constructor(props){
    super(props);

    this.state = {
      sightings: [],
      sightingModficationConfirmed: false,
    };

    this.onSightingModificationConfirmed = this.onSightingModificationConfirmed.bind(this);
  }

  onSightingModificationConfirmed(event){
    let updatedState = this.state;
    updatedState.sightingModficationConfirmed = true;

    this.setState( updatedState );
  }


    // shouldComponentUpdate(){
    //   let url = "http://localhost:3003/sightings"
    //   fetch(url)
    //   .then( results => {
    //     return results.json();
    //   })
    //   .then( data => {
    //     // console.log( data );
    //
    //     let sightings_jsx = data.map( (sighting) => {
    //       return(
    //           < TableRow sighting={sighting} onSightingModificationConfirmed={this.onSightingModificationConfirmed} />
    //       )
    //     });
    //
    //     this.setState({
    //       sightings: sightings_jsx.slice(0, 10),
    //       sightingModficationConfirmed: false
    //       });
    //   })
    //
    //
    // }

  componentDidMount(){
    let url = "http://apps.tare-gaskin.io/sightings"
    fetch(url)
    .then( results => {
      return results.json();
    })
    .then( data => {
      // console.log( data );

      let sightings_jsx = data.map( (sighting) => {
        return(
            < TableRow sighting={sighting} onSightingModificationConfirmed={this.onSightingModificationConfirmed} />
        )
      });

      this.setState({
        sightings: sightings_jsx.slice(0, 10),
        sightingModficationConfirmed: false
        });
    })


  }

  render(){
    let addSightingRowFiller = { NAME:'', PERSON: '', LOCATION:'', SIGHTED:'' }
    return(
      <div className='card'>
        <div className="table-title">Southern Sierra Wildflower Club Flower Index</div>
         <table className="table-hover">
           <thead className="thead-light">
             <tr>
               <th scope="col">Flower Common Name</th>
               <th scope="col">Location Sighted</th>
               <th scope="col">Sighted By</th>
               <th scope="col">Date Sighted</th>
             </tr>
           </thead>
            <tbody>
              {this.state.sightings}
              < TableRow sighting={ addSightingRowFiller } onSightingModificationConfirmed={this.onSightingModificationConfirmed} / >
              <tr className="table-footer"></tr>
            </tbody>
         </table>
      </div>
    );
  }
}

export default IndexEditor;


// Some hardcoded bumbacloth that I need to get justified right.
// <tbody>
// <tr>
// <th scope="row">1</th>
// <td>Pale Owls Clover</td>
// <td>Jennifer</td>
// <td>Frog Meadows Guard Station</td>
// <td>2006-06-01</td>
// </tr>
// <tr>
// <th scope="row">2</th>
// <td>Jacob</td>
// <td>Thornton</td>
// <td>@fat</td>
// </tr>
// <tr>
// <th scope="row">3</th>
// <td>Larry</td>
// <td>the Bird</td>
// <td>@twitter</td>
// </tr>
// </tbody>
