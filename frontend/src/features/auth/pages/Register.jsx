import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  
  const {handleRegister} = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    const payload = {
        username: form.username, 
        email: form.email, 
        password: form.password
    }

    try{
        await handleRegister(payload)
        console.log('Register successful')
        navigate("/login")
    }
    catch(error){
        console.log(error)
    }
  }

  if(!loading && user){
    navigate("/")
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-indigo-900 text-slate-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 shadow-2xl shadow-indigo-950/40'>
        <h2 className='text-3xl font-bold mb-2 text-cyan-300'>Create your account</h2>
        <p className='text-slate-300 mb-6'>Join Replex and design your dark, creative space.</p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <input
              id='username'
              name='username'
              type='text'
              value={form.username}
              onChange={handleChange}
           required
              placeholder='Enter username'
              className='w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-100'
            />
          </div>

          <div>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              required
              placeholder='Enter email address'
              className='w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-100'
            />
          </div>

          <div>
            <input
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              required
              placeholder='Enter password'
              className='w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-100'
            />
          </div>

          <div>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder='Confirm password'
              className='w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-100'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold hover:from-cyan-300 hover:to-indigo-400 transition'
          >
            Register
          </button>
        </form>

        <p className='mt-5 text-center text-sm text-slate-300'>
          Already have an account?{' '}
          <Link to='/login' className='text-cyan-300 hover:text-cyan-200 underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register