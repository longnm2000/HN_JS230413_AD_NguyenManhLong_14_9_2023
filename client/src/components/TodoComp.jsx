import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function TodoComp() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const axiosInstance = axios.create({
    baseURL: "https://your-api-url.com", // Thay thế bằng URL của máy chủ Express của bạn
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Thêm các tiêu đề khác nếu cần thiết
    },
  });
  const fetchData = async () => {
    try {
      let response = await axios.get("http://localhost:8000/todo");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (name === "") {
      Swal.fire({
        icon: "error",
        title: "Không để trống!",
        timer: 2000,
      });
      return;
    }
    try {
      await axiosInstance.post(`http://localhost:8000/todo`, {
        name: name,
        status: 0,
      });
      setName("");
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: error,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Có chắc muốn xoá không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`http://localhost:8000/todo/${id}`)
          .then(() => {
            fetchData();
            Swal.fire({
              icon: "success",
              title: "Đã xoá!",
              timer: 2000,
            });
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: "Có lỗi xảy ra!",
              text: error,
            })
          );
      }
    });
  };

  const handleComplete = async (id) => {
    try {
      await axiosInstance.put(`http://localhost:8000/todo/${id}`);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Đã cập nhật!",
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let userInfo = jwt_decode(localStorage.getItem("token"));
  return (
    <>
      <div className="text-center bg-info p-4 text-light">
        <h1>TODO LIST</h1>
      </div>
      <Container className="d-flex justify-content-between align-items-center my-3">
        <p className="m-0 fw-bold">
          {" "}
          Xin chào {+userInfo.data.role === 0 ? "User" : "Admin"}{" "}
          {userInfo.data.name}
        </p>
        <Button variant="danger" onClick={handleExit}>
          Đăng xuất
        </Button>
      </Container>
      <div className="bg-secondary-subtle">
        {+jwt_decode(localStorage.getItem("token")).data.role === 0 ? (
          <></>
        ) : (
          <div className="d-flex justify-content-center py-4">
            <div className="w-50">
              <Form onSubmit={handleAdd}>
                <InputGroup className="mb-3 mx-auto">
                  <Form.Control
                    placeholder="Add"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                  />
                  <Button variant="outline-secondary" type="submit">
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        )}
        <Container className="py-4">
          <Row xs={1} md={2}>
            <Col>
              <h2 className="text-center fw-bold">Uncompleted tasks</h2>

              <ListGroup>
                {data
                  .filter((e) => +e.status === 0)
                  .map((e, i) => (
                    <ListGroup.Item key={i}>
                      {+jwt_decode(localStorage.getItem("token")).data.role ===
                      0 ? (
                        <p className="m-0">{e.name}</p>
                      ) : (
                        <div className="d-flex align-items-center justify-content-between">
                          <dir>{e.name}</dir>
                          <div className="d-flex gap-2">
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(e.task_id)}
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleComplete(e.task_id)}
                            >
                              <i className="fa-regular fa-circle-check"></i>
                            </Button>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Col>
              <h2 className="text-center fw-bold">Completed tasks</h2>
              <ListGroup>
                {data
                  .filter((e) => +e.status === 1)
                  .map((e, i) => (
                    <ListGroup.Item key={i}>
                      {+jwt_decode(localStorage.getItem("token")).data.role ===
                      0 ? (
                        <p className="m-0">{e.name}</p>
                      ) : (
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="m-0 ">{e.name}</p>
                          <div className="d-flex gap-2">
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(e.task_id)}
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </Button>
                            <Button variant="light" disabled>
                              <i className="fa-solid fa-circle-check"></i>
                            </Button>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default TodoComp;
