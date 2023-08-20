import { useContext, useEffect, useRef } from "react";
import contentcontext from "../context/contents/ContentContext";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import AddContent from "./AddContent";
import Contentitem from "./Contentitem";
export default function Contents() {
  const context = useContext(contentcontext);
  const { contents, getallContent, editContent } = context;
  let navigate = useNavigate();

  const [content, Setcontent] = useState([
    {
      id: " ",
      etitle: "",
      edescription: "",
      etag: "default",
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
        getallContent();
    } else {
      navigate("/Login");
    }
    //  eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const updatecontents = (currentcontent) => {
    ref.current.click();
    Setcontent({
      id: currentcontent._id,
      etitle: currentcontent.title,
      edescription: currentcontent.description,
    });
  };
  const handleOnclick = (e) => {
    e.preventDefault();
    editContent(content.id, content.etitle, content.edescription, content.etag);

    refclose.current.click();
  };
  const onChangeClick = (e) => {
    Setcontent({ ...content, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <AddContent />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal" // {here you need to add bs because it is very  important}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit  Content
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* {here it is starts the form edit code} */}
            <div className="modal-body">
              <div className="container my-3">
                <form className="my-3">
                  <div className="form-group">
                    <label htmlFor="etitle">title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="etitle"
                      aria-describedby="emailHelp"
                      placeholder="Enter title "
                      value={content.etitle}
                      onChange={onChangeClick}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      placeholder="Enter description"
                      value={content.edescription}
                      onChange={onChangeClick}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnclick}
              >
                updateContent
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row  my-3">
        <h2>Your Content</h2>

        <div className="container mx-2"> 
                {contents.length ===0 && 'No notes to display'}
                </div>
        {contents.map((content) => {
          return (
            <Contentitem key={content._id} updateContent={updatecontents} content={content} />
          );
        })}
      </div>
    </div>
  );
}
{
  {
    // /*
    //       {notes.map((notes) => {
    //         return (
    //           <Noteitem key={notes._id} updateNote={updateNote} note={notes} />
    //         );
    //       })}
    //        */
  }
  /* This error come to our code due to that notes is a object and in map function only you can return 
that is the Array  and it is mandatory To solve the error, console.log the value you're calling the map()
method on and make sure to only call map on valid arrays */
}
{
  /*         
//         {Object.entities(notes).map(([key,value]) => {
//           return (
//             <Noteitem
//               key={key}
//               updateNote={updateNote}
//               note={value}
//             />
//           );//eslint-disable-next-line 
//         })} */
}

