import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "../css/LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ")
    .test("no-dot-after-@", "Email không hợp lệ", (value) => {
      if (!value) return true;
      const parts = value.split("@");
      const domainPart = parts[1];
      return domainPart ? domainPart.indexOf(".") !== -1 : false;
    }),
  password: yup.string().required("Mật khẩu không được để trống"),
});

function LoginComp() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [toggleType, setToggleType] = React.useState("password");
  const handleChangeType = (e) => {
    e.preventDefault();
    setToggleType((prev) => (prev === "text" ? "password" : "text"));
  };

  const onSubmit = (data) => {
    try {
      axios
        .post("http://localhost:8000/auth/signin", data)
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("token", res.data.access_token);
            Swal.fire({
              icon: "success",
              title: "Đăng nhập thành công!",
              text: "Tự động chuyển về trang chủ",
              timer: 1000,
            }).then(navigate("/"));
          } else if (res.data.status === 201) {
            Swal.fire({
              icon: "error",
              title: "Tài khoản đã bị khóa!",

              timer: 1000,
            });
          } else if (res.data.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Mật khẩu không chính xác!",

              timer: 1000,
            });
          } else if (res.data.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Email không tồn tại!",
              timer: 1000,
            });
          } else if (res.data.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Internal server error!",
              timer: 1000,
            });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: error,
        timer: 1000,
      });
    }
  };

  return (
    <>
      <Container>
        <Form
          className="mx-auto border p-4 login-form rounded my-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center">Đăng Nhập</h3>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Email"
                  autoFocus
                />
              )}
            />
            {errors.email && (
              <p className="alert alert-danger mt-3" role="alert">
                {errors.email.message}
              </p>
            )}
          </Form.Group>
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup className="mb-3">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type={toggleType}
                  placeholder="Mật khẩu"
                  className="pe-5"
                />
              )}
            />
            <Button
              onClick={handleChangeType}
              variant="outline-secondary"
              id="button-addon2"
            >
              {toggleType === "text" ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </Button>
          </InputGroup>
          {errors.password && (
            <p className="alert alert-danger mt-3" role="alert">
              {errors.password.message}
            </p>
          )}
          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
          <p className="my-3 text-center">
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
          </p>
        </Form>
      </Container>
    </>
  );
}

export default LoginComp;
