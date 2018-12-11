import React, { Component } from 'react';
import "../stylesheets/sheet1.css";


class TableRow  extends Component {
  render(){
    return(
    <tr>
     <th scope="col">Species</th>
     <th scope="col">Sighted By</th>
     <th scope="col">Location Sighted</th>
     <th scope="col">Date Sighted</th>
    </tr>
    );
  }
}

export default TableRow;
