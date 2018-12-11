import React, { Component } from 'react';
import "../stylesheets/sheet1.css";
import TableRow from "./TableRow";

class IndexEditor extends Component {
  constructor(props){
    super(props);

    this.state = {
      sightings: []
    };
  }

  componentDidMount(){
    let url = "http://localhost:3003/sightings"
    fetch(url)
    .then( results => {
      return results.json();
    })
    .then( data => {
      console.log( data );
      let sightings_jsx = data.map( (sighting) => {
        return(
          <tr key={sighting.id}>
            <td>{sighting.NAME}</td>
            <td>{sighting.PERSON}</td>
            <td>{sighting.LOCATION}</td>
            <td>{sighting.SIGHTED}</td>
          </tr>
        )
      })

      this.setState({ sightings: sightings_jsx.slice(0, 10) });
    })
  }

  render(){
    return(
      <div className='card'>
        <div className="table-title">Southern Sierra Wildflower Club Flower Index</div>
         <table className="table-hover">
           <thead className="thead-light">
             <tr>
               <th scope="col">Species</th>
               <th scope="col">Sighted By</th>
               <th scope="col">Location Sighted</th>
               <th scope="col">Date Sighted</th>
             </tr>
           </thead>
            <tbody>
              {this.state.sightings}
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
