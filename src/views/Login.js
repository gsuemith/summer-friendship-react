import React, { useState } from 'react'
import axios from 'axios'

const URL = "http://localhost:5000"
const bcrypt = require('bcryptjs')

const initForm = {
  username: '',
  password: ''
}

function Login() {
  const [form, setForm] = useState(initForm)

  const onChange = evt => {
    const { name, value } = evt.target;

    setForm({...form, [name]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault();

    axios.all([
      //get user
      axios.get(`${URL}/parent?username=${form.username}`),
      axios.get(`${URL}/child?username=${form.username}`)
    ])
    .then(res => {
      const user = res.filter(result => { 
        return  result.data.length > 0
      })[0].data[0];
      
      //check password
      if(user){
        bcrypt.compare(
          form.password, 
          user.password, 
          (err, result) => {
            if(result){
              alert("Logged In")
            } else {
              console.log("Please check username and password")
            }
          }
        );
      }
    })
    .catch(err => {
      console.log("Please check username and password", err)
    })
  }
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input type="text" 
            name="username"
            onChange={onChange}  
          />
        </label>
        <label>
          Password
          <input type="password" 
            name="password"
            onChange={onChange}  
          />
        </label>
        <button>Log In</button>
      </form>
    </div>
  )
}

export default Login
