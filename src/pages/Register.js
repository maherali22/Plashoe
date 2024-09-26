import React, { useState } from "react";
import axios from "axios";
import "./pagestyle/RegandUser.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userId: "",
    fullname: "",
    phonenumber: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
    admin: false,
    blocked: false,
    cart: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validate = () => {
    let errors = {};

    if (!inputs.userId) {
      errors.userId = "UserId is required.";
    } else if (!/^[A-Za-z0-9]{3,16}$/.test(inputs.userId)) {
      errors.userId = "UserId should be 3-16 characters and alphanumeric.";
    }

    if (!inputs.fullname) {
      errors.fullname = "Full name is required.";
    }

    if (!inputs.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      errors.email = "Email address is invalid.";
    }

    if (!inputs.password) {
      errors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,16}$/.test(
        inputs.password
      )
    ) {
      errors.password =
        "Password must be 8-16 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    if (!inputs.cpassword) {
      errors.cpassword = "Confirm password is required.";
    } else if (inputs.password !== inputs.cpassword) {
      errors.cpassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/users",
          inputs
        );
        console.log("User registered", response.data);

        setInputs({
          userId: "",
          fullname: "",
          email: "",
          phonenumber: "",
          gender: "",
          address: "",
          password: "",
          cpassword: "",
          cart: [],
        });

        alert("Registration successfully");
        navigate("/login");
      } catch (err) {
        console.error("Error registering user", err);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>UserId</label>
          <input
            type="text"
            name="userId"
            value={inputs.userId}
            onChange={handleChange}
            className={errors.userId ? "input-error" : ""}
          />
          {errors.userId && <p className="error">{errors.userId}</p>}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={inputs.fullname}
            onChange={handleChange}
            className={errors.fullname ? "input-error" : ""}
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            value={inputs.phonenumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={inputs.gender === "male"}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={inputs.gender === "female"}
            />
            Female
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={inputs.cpassword}
            onChange={handleChange}
            className={errors.cpassword ? "input-error" : ""}
          />
          {errors.cpassword && <p className="error">{errors.cpassword}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
      <div className="form-links">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
