import React from "react";
import { useContext } from "react";
import contentcontext from "../context/contents/ContentContext";

export default function Contentitem(props) {
  const context = useContext(contentcontext);
  const { deleteContent } = context;
  const { content, updateContent} = props;
  return (
    <div className="col md-3s">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{content.title}</h5>
          <p className="card-text">
            {content.description}
            <i className="far  fa-trash-alt mx-1"onClick={()=>{deleteContent(content._id)}}></i>
            <i className="far fa-edit mx-1 "onClick={()=>{updateContent(content)}}></i>
          </p>
        </div>
      </div>
    </div>
  );
}
