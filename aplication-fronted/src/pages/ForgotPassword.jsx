import React, { useState } from 'react'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    // Simulate call to backend
    setStatus({ type: 'info', text: `Solicitud enviada para ${email}. Si existe, llegará un correo.` })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Correo</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="tu@correo.com" />
        </div>
        <button className="bg-accent text-white px-4 py-2 rounded">Enviar</button>
      </form>
      {status && <div className="mt-4 p-3 rounded bg-blue-50 text-blue-800">{status.text}</div>}
      <p className="mt-3 text-sm text-slate-500">Nota: En esta demo el envío es simulado.</p>
    </div>
  )
}
