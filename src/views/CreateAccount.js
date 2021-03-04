import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { parentSchema, childSchema } from '../validation/createAccountSchema'

const URL = "http://localhost:5000"

const initialForm = {
  type: '',
  name: '',
  username: '',
  password: '',
  parentUsername: '',
}

const initialErrors = {
  email: "",
  password: "",
  terms: ""
}

function CreateAccount() {
  const [formValues, setFormValues] = useState(initialForm);
  const [disabled, setDisabled] = useState(true);
  const [parentUsernames, setParentUsernames] = useState([]);
  const [childUsernames, setChildUsernames] = useState([]);
  const [errors, setErrors] = useState(initialErrors);

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

  //submit disabled
  useEffect(() => {
    let schema = formValues.type === 'parent' 
      ? parentSchema([], [...parentUsernames, ...childUsernames]) 
      : childSchema(parentUsernames, [...parentUsernames, ...childUsernames])

    schema.isValid(formValues).then(valid => setDisabled(!valid))
    
  }, [formValues])

  const onChange = evt => {
    const { name, value } = evt.target;

    if(name === 'type'){
      setFormValues({...initialForm, type: value});
      setErrors(initialErrors)
      return;
    }

    let schema = formValues.type === 'parent' 
      ? parentSchema([], [...parentUsernames, ...childUsernames]) 
      : childSchema(parentUsernames, [...parentUsernames, ...childUsernames])

    yup.reach(schema, name)
      .validate(value)
      .then(valid => {
        setErrors({
          ...errors, [name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors, [name]: err.errors[0]
        });
      })

    setFormValues({...formValues, [name]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault();
    
    const newUser = {
      username: formValues.username,
      password: formValues.password,
      name: formValues.name,
    }

    axios.get(`${URL}/parent?username=${formValues.parentUsername}`)
      .then(res => {
        console.log(res);
      })

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
          <span>{errors.type}</span>
          <select 
            name="type" 
            onChange={onChange}
            value={formValues.type}
          >
            <option value="">---Who are you?---</option>
            <option value="parent">Parent</option>
            <option value="child">Youth</option>
          </select>
        </label>

        {
          formValues.type !== '' &&
          <div>
            <label htmlFor="name">
              Name:
              <span>{errors.name}</span>
              <input 
                type="text" 
                name="name"
                onChange={onChange}
                value={formValues.name}
              />
            </label>
            <label htmlFor="username">
              User Name:
              <span>{errors.username}</span>
              <input 
                type="text" 
                name="username"
                onChange={onChange}
                value={formValues.username}
              />
            </label>
            <label htmlFor="password">
              Password:
              <span>{errors.password}</span>
              <input 
                type="password" 
                name="password"
                onChange={onChange}
                value={formValues.password}
              />
            </label>
          </div>
        }

        { 
          formValues.type === 'child' &&
          <label htmlFor="parentUsername">
            Enter your parent's username:
            <span>{errors.parentUsername}</span>
            <input 
              type="password" 
              name="parentUsername"
              onChange={onChange}
              value={formValues.parentUsername}
            />
          </label>
        }

        <button disabled={disabled}>Sign Up</button>
      </form>
    </>
  )
}

export default CreateAccount
