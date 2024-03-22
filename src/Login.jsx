import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
const Login = (props) => {
  const [loading, setloading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [isNotRegister, setisNotRegister] = useState(false)
  let navigate = useNavigate();
  let [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    user = { ...user };
    user[e.target.name] = e.target.value;
    setuser(user);
    displayError(user);
    //   setuser(prev=>{return{...prev, ...myUser}})
    // console.log(user);
  };
  const displayError = (user) => {
    let validatrResult = validateRegister(user);
    if (validatrResult.error) {
      setloading(false);
      setErrorList(validatrResult.error.details);
    } else {
      setErrorList([]);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    let validatrResult = validateRegister(user);
    console.log(validatrResult);
    if (validatrResult.error) {
      setloading(false);
      setErrorList(validatrResult.error.details);
    } else {
      let response = await axios.get(`http://localhost:3000/register`);
      if (response) {
        let result = response.data.filter((ele) => {
          return ele.email === user.email && ele.password === user.password
            ? ele
            : setisNotRegister(true);
        });
        console.log(result);
        setloading(true);
        if (result.length>0) {
          localStorage.setItem("token", result[0].first_name);
          setloading(false);
          props.getUser();
          navigate("/home");
        } else {
          setloading(false);
          alert('INVALID EMAIL OR PASSWORD')
        }
      } else {
        alert(`INVALID EMAIL OR PASSWORD`);
      }
    }
  };
  function validateRegister(user) {
    let schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div>
      <div className="container  m-auto my-3 p-3">
        <h1 className="text-center">LOGIN</h1>
        {errorList.map((ele, index) => {
          return (
            <div key={index} className="alert alert-danger">
              {ele.message}
            </div>
          );
        })}

        <form onSubmit={handleRegister}>
          <label htmlFor="email">EMAIL:</label>
          <input
            type="email"
            placeholder="email"
            className="form-control my-2"
            name="email"
            id="email"
            onChange={handleUser}
          />

          <label htmlFor="password">PASSWORD:</label>
          <input
            type="password"
            placeholder="password"
            className="form-control my-2"
            name="password"
            id="password"
            onChange={handleUser}
          />
          <button className="btn btn-outline-info">
            {loading ? <i className="fa  fa-spinner"></i> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
