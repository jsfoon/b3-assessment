import React from "react";
import Barcode  from "react-barcode";
import { Link } from 'react-router-dom';

export default function Grocery(props) {
  const { grocery } = props;

  const groRows = grocery.map((gro, idx) => (
    <tr key={idx} >
      <td>
        <Link to={`/product/${gro.id}`}>Edit</Link>
      </td>
      <td><Barcode value={gro.upc12.toString()}/></td>
      <td>{gro.name}</td>
      <td className="right aligned">{gro.brand}</td>
    </tr>
  ));

  return (
    <table className="ui selectable structured large table">
      <thead>
        <tr>
          <th className="">Action</th>
          <th>UPC 12</th>
          <th>Name</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        {groRows}
      </tbody>
    </table>
  );
}

