import React, { useState } from 'react'

const mockUser = { id: 22, email: 'larteas0@gmail.com', full_name: 'Usuario Demo' }

export default function UpdateProfile(){
  const [fullName, setFullName] = useState(mockUser.full_name)
  const [email, setEmail] = useState(mockUser.email)
  const [message, setMessage] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    // Simulate update
    setMessage({ type: 'success', text: 'Perfil actualizado (simulado).' })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Actualizar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Nombre completo</label>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <button className="bg-accent text-white px-4 py-2 rounded">Guardar</button>
      </form>
      {message && <div className="mt-4 p-3 rounded bg-green-50 text-green-800">{message.text}</div>}
    </div>
  )
}
