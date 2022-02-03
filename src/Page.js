import React, { Component } from "react";
import { Col, Row } from "reactstrap";

const Page = () => {
  return (
    <Row>
      <Col md={4}>
        <label>Enter a file</label>
        <input type="file"></input>
        <button type="submit">Submit</button>
      </Col>
      <Col md={4}>
        <select
          className="rowC"
          id="dropdown"
          //  onChange={handleSelect}
          style={{ height: "100%", width: "100%" }}
        >
          <option value="">Serial Number</option>
          <option value="1">Phone Number</option>
          <option value="2">Status</option>
        </select>
        <button type="submit">Search</button>
        <button type="submit">Export</button>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
};

export default Page;
