import React, { Component } from 'react';
import "../stylesheets/sheet1.css";


class IndexEditor extends Component {
  render(){
    return(
      <div className='card'>
        <div>Southern Sierra Wildflower Club Flower Index</div>
         <table class="table-hover">
           <thead class="thead-light">
             <tr>
               <th scope="col">Species</th>
               <th scope="col">Sighted By</th>
               <th scope="col">Location Sighted</th>
               <th scope="col">Date Sighted</th>
             </tr>
           </thead>

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
