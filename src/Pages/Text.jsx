import { doc, serverTimestamp, updateDoc,onSnapshot,collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { db } from './fireConfig';
function Text() {
  const [title,setTitle]=useState()
  const [value,setValue]=useState()
  const {id}=useParams("")
  useEffect(()=>{
    addOrUpdate()
    const unsub=onSnapshot(collection(db,"docs"),(snapshot)=>{
      let list=[]
      snapshot.docs.forEach((doc)=>{
        list.push({id:doc.id,...doc.data()})
      })
      let EditableText=list.find((item)=>item.id==id)
      setValue(EditableText.note);
      setTitle(EditableText.title)
      console.log(value);
    },(error)=>{
      console.log(error);
    });
    return()=>{
      unsub();
    }
    
  },[id,value])
  const addOrUpdate=async()=>{
    await updateDoc(doc(db,"docs",id),{
      note:value,
      timestamp:serverTimestamp()
    })
  }
  return (
    <div className='d-flex flex-column  justify-content-center align-items-center  mt-3'>
        <h3>{title}</h3>
        <ReactQuill className='w-50' theme="snow" value={value} onChange={setValue} />
    </div>
    
  )
}

export default Text