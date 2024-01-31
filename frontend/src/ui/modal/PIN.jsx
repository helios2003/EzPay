import React, { useState, useRef } from 'react'
import { TiTick } from 'react-icons/ti'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function PIN() {
  const inputRefs = Array.from({ length: 4 }, () => useRef(null))

  const success = (time) => {
    console.log("success")
    toast.success("PIN successfully added", { autoClose: time })
  }

  const failure = (time) => {
    toast.error("Unsuccessful, please try again", { autoClose: time })
  }
  let submitString = ""
  function handleChange(value, index) {
    if (value.length == 1 && index < inputRefs.length) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus()
      }
      submitString += value
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus()
      submitString = submitString.slice(0, -1)
    }
    if (e.key === "Enter" && e.target.value && index < otp.length - 1) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleSubmit = async () => {
    console.log(submitString)
    const token = localStorage.getItem('token')
    const url = "http://localhost:3000/api/v2/addpin"
    
    try {
      const response = await axios.post(
        url,
        {
          username: localStorage.getItem('username'),
          PIN: submitString,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        success(2000)
      } else {
        failure(2000)
      }
    } catch (error) {
      console.error(error)
      failure(2000)
    }
  }

  return (
    <>
      <div className="text-3xl mb-16">Enter PIN</div>
      <div className="flex items-center justify-center space-x-4">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            className="text-2xl border-2 border-black h-14 w-14 rounded-lg text-center"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspaceAndEnter(e, index)}
            ref={ref}
          />
        ))}
      </div>
      <TiTick
        className="mt-6 h-14 w-14 bg-black text-white rounded-full"
        onClick={handleSubmit}
      />
      <ToastContainer />
    </>
  )
}
