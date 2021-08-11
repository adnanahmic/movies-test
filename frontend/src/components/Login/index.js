import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions";
import "./login.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    minWidth: 600,
  },
};

Modal.setAppElement("#root");

const Login = ({ onClose, isOpen }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    strategy: 'local'
  });

  const isDisabled = useMemo(
    () => !Object.values(formData).every((val) => val),
    [formData]
  );

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });


  const handleSubmit = () => {
    onClose()
    dispatch(login(formData))
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div className="form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} disabled={isDisabled}>
            Login
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
