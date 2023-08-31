import React from "react";
import { useContext, useEffect, useRef } from "react";
import contentcontext from "../context/contents/ContentContext";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Contentitem from "./Contentitem";
function AdminHome() {
    const context = useContext(contentcontext);
    const { contents } = context;
  const host = "http://localhost:8000";
  let navigate = useNavigate();
  const [content, Setcontent] = useState([
    { 
      title: "",
      description: "",
      tag: "default",
    },
  ]);

  const getallContent = async () => {
    // to do api call
    const response = await fetch(`${host}/api/admin/fetchallcontents`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json", 
        "auth-token":localStorage.getItem('token')


      },
      // body: JSON.stringify({title,description}),
    });
    const result = await response.json();
    Setcontent(result);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
        getallContent();
    } else {
      navigate("/AdminLogin");
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
  return (
    <div>
     {contents.map((content) => {
          return (
            <Contentitem key={content._id} updateContent={updatecontents} content={content} />
          );
        })}
    </div>
  );
}
export default AdminHome;
