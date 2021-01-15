import { uniqueId } from "lodash";
import moment from "moment";
import "moment/locale/es";
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import _ from "lodash";
import { Pen, Trash } from "react-bootstrap-icons";

function formatDate(date) {
  return moment(date).locale("es").format("LL");
}

export default function List() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    function getData() {
      if (localStorage.getItem("stgData"))
        setData(JSON.parse(localStorage.getItem("stgData")));
    }
    getData();
  }, []);

  function handleDelete(idx) {
    console.log(idx);
    data.splice(idx, 1);
    localStorage.setItem("stgData", JSON.stringify(data));
    setData(JSON.parse(localStorage.getItem("stgData")));
  }

  function Item({ item }) {
    const [itemData, setItemData] = React.useState({
      name: item.name,
      email: item.email,
      birthDate: item.birthDate,
    });

    const [editMode, setEditMode] = React.useState(false);

    function handleChange(e) {
      setItemData({ ...itemData, [e.target.name]: e.target.value });
    }
    function handleEdit() {
      setEditMode(true);
    }

    function handleUpdate() {
      data[data.indexOf(item)] = itemData;
      localStorage.setItem("stgData", JSON.stringify(data));
      setData(JSON.parse(localStorage.getItem("stgData")));
    }

    return editMode ? (
      <Form onSubmit={handleUpdate} className="mt-2">
        <Row className="text-center">
          <Col>
            <Form.Control
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your full name"
              defaultValue={itemData.name}
              required
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              defaultValue={itemData.email}
              placeholder="Enter your email"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleChange}
              name="birthDate"
              type="date"
              defaultValue={itemData.birthDate}
              placeholder="Enter your birth date"
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="danger" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    ) : (
      <Row className="text-center mt-2">
        <Col>{item.name}</Col>
        <Col>{_.get(item, "email")}</Col>
        <Col>{formatDate(item.birthDate)}</Col>
        <Col>
          <Trash
            className="mr-3"
            style={{ color: "red", fontSize: 20, cursor: "pointer" }}
            onClick={() => handleDelete(data.indexOf(item))}
          />
          <Pen
            style={{ color: "green", fontSize: 20, cursor: "pointer" }}
            onClick={() => handleEdit()}
          />
        </Col>
      </Row>
    );
  }

  return (
    <div className="pt-5">
      <Row className="text-center">
        <Col className="h5">Nombre</Col>
        <Col className="h5">Email</Col>
        <Col className="h5">Fecha de Nacimiento</Col>
        <Col />
      </Row>
      {data && data.map((item) => <Item item={item} key={uniqueId()} />)}
    </div>
  );
}
