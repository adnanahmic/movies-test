import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { rateMovie } from "../../store/actions";
import Login from "../Login";
import "./movieRating.scss";

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

const RateMovie = ({ onClose, isOpen, movieId }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    rating: ''
  });
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const isDisabled = useMemo(
    () => !Object.values(formData).every((val) => val),
    [formData]
  );

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });


  const handleSubmit = () => {
    dispatch(rateMovie({ rating: parseFloat(formData.rating), movieId, type: 'movie' }))
    onClose()
  };

  useEffect(() => {
    if (isOpen && !localStorage.getItem('token'))
      openModal()
  }, [isOpen, modalIsOpen])

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div className="form">
          <h2>Rate Movie</h2>
          <select
            placeholder="Rating"
            value={formData.rating}
            name="rating"
            onChange={handleChange}
          >
            <option value="" disabled>Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <button onClick={handleSubmit} disabled={isDisabled}>
            Submit
          </button>
        </div>
      </Modal>
      <Login onClose={closeModal}
        isOpen={modalIsOpen} />
    </div>
  );
};

export default RateMovie;
