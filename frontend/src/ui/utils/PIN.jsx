import React from 'react';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PIN() {
  let submitString = "";
  const inputRefs = Array.from({ length: 4 }, () => React.createRef());

  const success = (time) => {
    console.log("success");
    toast.success("PIN successfully added", { autoClose: time })
  }
  const failure = (time) => {
    toast.error("Unsuccessful, please try again", { autoClose: time });
  }

  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
      submitString += value;
      console.log(submitString);
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
      submitString = submitString.slice(0, -1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !inputRefs[index].current.value) {
      inputRefs[index - 1].current.focus();
      submitString = submitString.slice(0, -1); 
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v2/addpin', {
        username: "sexy@gmail.com",
        PIN: submitString,
      })
      if (response.status === 200) {
        success(2000);
      } else {
        failure(2000);
      }
    } catch (error) {
      failure(2000)
    }
  };

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
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
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
  );
}
