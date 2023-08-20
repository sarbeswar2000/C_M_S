
import ContentContext from "./ContentContext";
import { useState } from "react";
  const ContentState = (props) => {
  const host = "http://localhost:8000";
  const contentinitial = [];
  const [contents,Setcontent] = useState(contentinitial);
//Get all notes
const getallContent = async () => {
  // to do api call
  const response = await fetch(
    `${host}/api/contents/fetchallcontents`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      // body: JSON.stringify({title,description}),
    }
    );
    const result=await response.json();
    Setcontent(result)
  
};
  // Add notes
  const addContent = async (title, description, tag) => {
    // to do api call
    const response = await fetch(
      `${host}/api/contents/addcontents`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },

        body: JSON.stringify({title,description}),
      }
    );
     
    const content = await response.json();
    Setcontent(contents.concat(content));
  };
  // Delete Notes
  const deleteContent = async (id) => {
    const response = await fetch(
      `${host}/api/contents/deletecontents/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },  
      }
    );
    const result=await response.json();
    console.log(result);
    // setNotes(result);
    // const values = Object.values(notes);
    const newContents = contents.filter((content) => {
      return content._id !== id;
    });
    Setcontent({newContents});    
  };
  //Edit note
  const editContent = async (id, title, description, tag) => {
    // api call
    const response = await fetch(
      `${host}/api/contents/updatecontents/${id}`,
      {
        method:"PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },

        body: JSON.stringify({title,description,tag}),
      }
    );
    //  const json= response.json();
    // logic to edit in clients
 let Newcontents=JSON.parse(JSON.stringify(contents));
    for (let index = 0; index <Newcontents.length; index++) {
      const element = Newcontents[index];
      if (element._id === id) {
        Newcontents[index].title = title;
        Newcontents[index].description = description;
        Newcontents[index].tag = tag;
        break;
      }  
    }
    Setcontent(Newcontents);
  };
  return (
    <ContentContext.Provider value={{ contents, addContent, editContent,deleteContent,getallContent}}>
      {props.children}
    </ContentContext.Provider>
  );
};
export default ContentState; 


