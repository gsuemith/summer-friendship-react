import React, { useState } from 'react'
import axios from 'axios'

const URL = "http://localhost:5000"

const initialForm = {
  type: '',
  name: '',
  username: '',
  password: '',
}

function CreateAccount() {
  const [formValues, setFormValues] = useState(initialForm);

  const onChange = evt => {
    const { name, value } = evt.target;

    setFormValues({...formValues, [name]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault();

    const newUser = {
      username: formValues.username,
      password: formValues.password,
      name: formValues.name,
    }

    axios.post(`${URL}/${formValues.type}`, newUser)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("User account not created:", err)
      })
    console.log(newUser);
  }

  return (
    <>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <label for="type">
          Account Type:
          <select 
            name="type" 
            onChange={onChange}
            value={formValues.type}
          >
            <option value="">---Who are you?---</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>
        </label>
        <label for="name">
          Name:
          <input 
            type="text" 
            name="name"
            onChange={onChange}
            value={formValues.name}
          />
        </label>
        <label for="username">
          User Name:
          <input 
            type="text" 
            name="username"
            onChange={onChange}
            value={formValues.username}
          />
        </label>
        <label for="password">
          Password:
          <input 
            type="text" 
            name="password"
            onChange={onChange}
            value={formValues.password}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </>
  )
}

export default CreateAccount
