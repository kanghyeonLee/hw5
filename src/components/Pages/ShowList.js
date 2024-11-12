import React, { useState } from "react";

function ShowList() {
    const [makeList, setMakeList] = useState(false);
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState({ name:"", age:"",sex: "", major:""});
    const [editData, setEditData] = useState({name:"", age:"",sex: "", major:""});
    const [currentId, setCurrentId] = useState(null);

    const getCourses = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://67288771270bd0b97555f84b.mockapi.io/api/v1/students");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send();
       
        xhr.onload = () => {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            setData(res);
            setMakeList(true);
          } else {
            console.log(xhr.status, xhr.statusText);
          }
        };

    };

    const postData = () => {
        if(!studentData.name || !studentData.age || !studentData.sex|| !studentData.major){
          alert("Blank input!!");
        }else{
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "https://67288771270bd0b97555f84b.mockapi.io/api/v1/students");
          xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
          xhr.send(JSON.stringify(studentData));

            xhr.onload = () => {
            if (xhr.status == 201) {
                setStudentData({ name:"", age:"",sex: "", major:""});
                getCourses();
            } else {
                console.log(xhr.status, xhr.statusText);
            }
            };
          }
    };

  
 
    const updateData = () => {
        if(!currentId||!editData.name || !editData.age || !editData.sex || !editData.major){
          alert("Blank input!!");
        }else{
          const xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://67288771270bd0b97555f84b.mockapi.io/api/v1/students/" + currentId);
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(editData));

        xhr.onload = () => {
            if (xhr.status == 200) {
                setEditData({name:"", age:"",sex: "", major:""});
                getCourses();
            } else {
                console.log(xhr.status, xhr.statusText);
            }
            };
      }
      }

      const deleteData = (id) => {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "https://67288771270bd0b97555f84b.mockapi.io/api/v1/students/" + id);
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify());

        xhr.onload = () => {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getCourses();
          } else {
            console.log(xhr.status, xhr.statusText);
          } 
        };
      }
    
    
    return (
        
        <div>
        <div className="btnDiv">
          <button id="btnData" type="button" className="btn btn-primary" onClick={getCourses}>
            Bring students data
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add student data
          </button>
  
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Student
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body input-button">
                  <input type="text" value={studentData.name} size="10" placeholder="name" onChange={(d) => setStudentData({...studentData, name: d.target.value})} />
                  <input type="number" value={studentData.age} size="3" placeholder="age" onChange={(d) => setStudentData({...studentData, age: d.target.value})}/>
                  <input type="text" value={studentData.sex} size="7" placeholder="sex" onChange={(d) => setStudentData({...studentData, sex: d.target.value})}/>
                  <input type="text" value={studentData.major} size="20" placeholder="major" onChange={(d) => setStudentData({...studentData, major: d.target.value})}/>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button id="btnAdd" type="button" className="btn btn-primary" onClick={postData}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <div
            className="modal fade"
            id="modifyModal"
            tabIndex="-1"
            aria-labelledby="ModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="ModalLabel">
                    Modify Student
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body input-button">
                  <input type="text" value={editData.name} size="10" placeholder="name"  onChange={(d) => setEditData({ ...editData, name: d.target.value })}/>
                  <input type="number" value={editData.age} size="3" placeholder="age"  onChange={(d) => setEditData({ ...editData, age: d.target.value })}/>
                  <input type="text" value={editData.sex} size="7" placeholder="sex"  onChange={(d) => setEditData({ ...editData, sex: d.target.value })}/>
                  <input type="text" value={editData.major} size="20" placeholder="major"  onChange={(d) => setEditData({ ...editData, major: d.target.value })}/>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    id="btnUpdate"
                    type="button"
                    className="btn btn-primary" onClick={updateData}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="contents" style={{ height: "100%", backgroundColor: "lightgoldenrodyellow" }}>
        {makeList &&(
          <ul>
          {data.map((student) => (
            <li key={student.id}>
              {student.name}, age: {student.age} ({student.sex}) ({student.major})
              <button
                className="btn btn-primary innerbtn"
                data-bs-toggle="modal"
                data-bs-target="#modifyModal"
                onClick={() => {
                  setCurrentId(student.id);
                  setEditData(student);
                }}
              >
                Modify
              </button>
              <button
                className="btn btn-primary innerbtn"
                onClick={() => deleteData(student.id)}
              >
                DELETE
              </button>
            </li>
          ))}
        </ul>
        )}
        </div>
      </div>
    );
  }
  
  export default ShowList;
  