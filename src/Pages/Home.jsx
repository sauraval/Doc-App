import React from 'react'
import { useEffect, useState } from 'react'
import {  Button, Col, Row } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from './fireConfig';

function Home(){
  const [document,setDocument]=useState({
    title:"",
    note:""
  })
  const [alldocs,setAllDocs]=useState([])
  const handleAddTitle=()=>{
    try {
      const docRef =  addDoc(collection(db, "docs"),{
        ...document,
        timestamp:serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    handleClose()
  }
  useEffect(()=>{
    const unsub=onSnapshot(collection(db,"docs"),(snapshot)=>{
      let list=[]
      snapshot.docs.forEach((doc)=>{
        list.push({id:doc.id,...doc.data()})
      })
      setAllDocs(list)
    },(error)=>{
      console.log(error);
    });
    return()=>{
      unsub();
    }
  },[])
  const handleDelete=async(id)=>{
    if(window.confirm("Are you sure to delete This Doc?")){
      try{
        await deleteDoc(doc(db,"docs",id))
      }
      catch(error){
        console.log(error);
      }
    }
  }
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <div className='d-flex flex-column justify-content-center align-items-center '>
        <h1 className=' mt-5'>DOC APP</h1>
        <Button onClick={handleShow} className='btn text-center fs-5'>Add Document + </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add DOC Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter Title"
        onChange={e=>setDocument({...document,title:e.target.value})}
        className="mb-3"
      >
        <Form.Control  type="text" placeholder="Enter Title" 
        />
       </FloatingLabel>
        <div className='d-flex justify-content-center '>
        <Button onClick={handleAddTitle} className='w-25' variant="info" >
            Add
          </Button>
        </div>
        </Modal.Body>
      </Modal>

        </div>
        <div className='mt-5'>
        <Row  className='px-5'>
        
         {alldocs?.map((doc)=>(
          <Col key={doc.id} className='mb-5  ' xl={4} lg={4} md={6} sm={12}>
          <div style={{width:'400px',minHeight:'200px'}} className='border border-2 border-black  rounded-3  p-2 ' >
          <div className='d-flex justify-content-between'>
              <h4 className='fw-bolder'>{doc.title}</h4>
              <div>
              <Button onClick={()=>navigate(`/text/${doc.id}`)} variant='link'><i class="fa-solid fa-pen fs-5"></i></Button>
              <Button onClick={()=>handleDelete(doc.id)}  variant='link'><i class="fa-solid fa-trash fs-5 text-danger"></i></Button>
              </div>
              </div>
              {parse(doc.note)}
          </div>
          </Col>
         ))}
      </Row>
        </div>
    </div>
  )
}

export default Home