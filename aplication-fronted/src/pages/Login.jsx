import React, { useState } from 'react'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    setMessage({ type: 'success', text: `Simulado login para ${username}` })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Usuario</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="usuario" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Contraseña</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="mt-1 w-full border rounded px-3 py-2" placeholder="contraseña" />
        </div>
        <button className="bg-accent text-white px-4 py-2 rounded">Entrar</button>
      </form>
      {message && <div className={`mt-4 p-3 rounded ${message.type==='success'? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{message.text}</div>}
    </div>
  )
}
