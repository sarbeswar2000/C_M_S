import React, { useState } from "react";
import { useContext } from "react";
import contentcontext from "../context/contents/ContentContext";

// import Noteitem from "./Noteitem";
function AddNote() {
  const context = useContext(contentcontext);
  const { addContent } = context;
  const [content, setContent] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleOnclick = (e) => {
    e.preventDefault();
    addContent(content.title, content.description, content.tag);
    setContent({
      title: "",
      description: "",
    });
  };
  const onChangeClick = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };
  return (
    <div >
      <div className="container my-3 ">
        <h2>Add  Content</h2>
      </div>
      <div className="container my-3">
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title "
              onChange={onChangeClick}
              value={content.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={onChangeClick}
              value={content.description}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleOnclick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
