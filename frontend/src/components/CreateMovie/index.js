import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { createMovie } from "../../store/actions";
import Login from "../Login";
import "./createMovies.scss";

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

const CreateMovie = ({ onClose, isOpen }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    release: "",
    cast: "",
    type: "",
    cover: "",
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

  const handleFileChange = event => setFormData({ ...formData, cover: event.target.files[0] })

  const handleSubmit = () => {
    let movieData = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'cast')
        movieData.append(key, formData[key].split(',').map(el => {
          el.trim()
          el.toUpperCase()
          return el
        }))
      else
        movieData.append(key, formData[key])
    })
    dispatch(createMovie({ movieData, type: formData.type }))
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
          <h2>Add New Movie / Show</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Select Release Data"
            value={formData.release}
            name="release"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Cast by comma seperated"
            value={formData.cast}
            name="cast"
            onChange={handleChange}
          />
          <select
            placeholder="type"
            value={formData.type}
            name="type"
            onChange={handleChange}
          >
            <option value="" disabled>Select Type</option>
            <option value="movie">Movie</option>
            <option value="show">TV Show</option>
          </select>
          <input
            type="file"
            placeholder="Select Cover Image"
            name="cover"
            multiple={false}
            onChange={handleFileChange}
          />
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

export default CreateMovie;
