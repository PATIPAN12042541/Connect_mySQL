import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import Moment from 'moment';
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";


const Edituser = () => {
    
  const [datauser, setDatauser] = useState([]); 
  
    // เเสดงรูปใน Database
    useEffect(() => {
      const getDatauser = async () =>{
        try {
          const {data: res} = await axios.get("http://localhost:3001/data_detail");
          setDatauser(res);
        } catch (error) {
          console.error(error.message);
        }
      }
        getDatauser();
    }, []);

    // เเสดงผลตัวอย่างรูปภาพ
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
      if (images.length < 1) return;
      const newImageUrls = [];
      images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
      setImageURLs(newImageUrls);
    }, [images]);
  
    function onImageChange(e) {
      setImages([...e.target.files]);
    }

    // ADD ข้อมูล
    const [ subject    , setSubject     ]   = useState("");
    const [ datesubject, setDateSubject ]   = useState("");
    const [ timesubject, setTimeSubject ]   = useState("");
    const [ options    , setOptions     ]   = useState("toxic")

  const addDataDetail = () => {
    axios.post('http://localhost:3001/create', {
        subject: subject,
        date_subject : datesubject,
        time_subject : timesubject,
        type_subject : options,
        files        : images[0],
    }).then(() => {
      setDatauser([
        ...datauser,
        {
          subject: subject,
          date_subject : datesubject,
          time_subject : timesubject,
          type_subject : options,
          files        : images[0],
        },
      ]);
    });
  };

  // ลบข้อมูล
  const deleteDataDetail = async (id) => {
    await axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
        setDatauser(
            datauser.filter((val) => {
              return (
                val.subject_id != id
              )
          })
      );
    });
  };

  // Upload รูปภาพ
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");

    return (
    <div>
        <div className='form-control'>
        <center>
          <br/>
          <div className="mb-3 row">
              <label  className="col-sm-2 col-form-label"  htmlFor="" > หัวข้อ : </label >
              <div className="col-sm-3">
                <input type="text"  className="form-control" placeholder="กรุณากรอกหัวข้อ"
                  onChange={(event) => {
                    setSubject(event.target.value)
                  }}
                />
              </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label"  htmlFor="" > วันที่ : </label >
            <div className="col-sm-3">
              <input type="date"  className="form-control" placeholder="กรุณากรอกวันที่"
                    onChange={(event) => {
                      setDateSubject(event.target.value)
                    }}
              />
            </div>
           </div>

          <div className="mb-3 row">
            <label  className="col-sm-2"  htmlFor="" > เวลา : </label >
            <div className="col-sm-1">
              <input type="time"  className="form-control" placeholder="กรุณากรอกเวลา"
                    onChange={(event) => {
                      setTimeSubject(event.target.value)
                    }}
              />
            </div>
          </div>
         
          
          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label"  htmlFor="" > ชนิด : </label >
            <div className="col-sm-3">
              <select className="form-control" type="dropdown" value={options}
                onChange = {(e) => {
                  const selectType = e.target.value;
                  setOptions(selectType);
                }}
              >
                <option value = "toxic">toxic</option>
                <option value = "non-toxic">non-toxic</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label"  htmlFor="" > อัพโหลด : </label >
            <div className="col-sm-3">
              <input type="file"  className="form-control" multiple accept="image/*" placeholder="กรุณาอัพโหลดรูปภาพ" onChange={onImageChange} />
              <br/>
              {imageURLs.map((imageSrc, idx) => (
                <img key={idx} width="250" height="150" border = "1" src={imageSrc} />
              ))} 
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-10">
              <button type="button" className="btn btn-success" onClick={addDataDetail} > ยืนยัน</button>
            </div>
          </div>
        </center>
       </div>   
        <div className='form-control'>

            <br/>
            <br/>
              <table className="table">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Type</th>
                        <th scope="col">images</th>
                        <th scope="col">Manage</th>
                      </tr>
                  </thead>
                {datauser.map((val,index) => {
                  return (
                    <>
                        <tbody >
                          <tr  key = {index}>
                            <td scope="row">{index+1}</td>
                            <td>{val.subject}</td>
                            <td>{Moment(val.date_subject).format('DD-MM-YYYY')}</td>
                            <td>{val.time_subject}</td>
                            <td>{val.type_subject}</td>
                            <td><Zoom><img className="img-fluid img-thumbnail" src = {val.path_subject} width = {100 } /></Zoom></td>
                            <td>
                            <span><button type="button" className="btn btn-warning"><AiOutlineEdit/></button> </span>
                            <span><button onClick={() => {deleteDataDetail(val.subject_id)}} type="button" className="btn btn-danger"  ><BsTrash/></button> </span>
                            </td>
                          </tr>
                        </tbody>
                   </>  
                );
            })}
            </table>   
        </div>
    </div>
    );
}



export default Edituser;

