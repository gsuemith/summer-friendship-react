import React, { useState, useEffect } from 'react'
import axios from 'axios'

const URL = "http://localhost:5000"

const initialForm = {
  type: '',
  name: '',
  username: '',
  password: '',
  parentUsername: '',
}

function CreateAccount() {
  const [formValues, setFormValues] = useState(initialForm);
  const [parentUsernames, setParentUsernames] = useState([]);
  const [childUsernames, setChildUsernames] = useState([]);

  //get list of usernames;
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/parent`),
      axios.get(`${URL}/child`)
    ])
    .then(res => {
      setParentUsernames(
        res[0].data.map(obj => obj.username)
      )
      setChildUsernames(
        res[1].data.map(obj => obj.username)
      )
    })

    
  }, [])

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
        <label htmlFor="type">
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
        <label htmlFor="name">
          Name:
          <input 
            type="text" 
            name="name"
            onChange={onChange}
            value={formValues.name}
          />
        </label>
        <label htmlFor="username">
          User Name:
          <input 
            type="text" 
            name="username"
            onChange={onChange}
            value={formValues.username}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input 
            type="password" 
            name="password"
            onChange={onChange}
            value={formValues.password}
          />
        </label>
        <label htmlFor="parentUsername">
          Enter your parent's username:
          <input 
            type="password" 
            name="parentUsername"
            onChange={onChange}
            value={formValues.parentUsername}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </>
  )
}

export default CreateAccount
