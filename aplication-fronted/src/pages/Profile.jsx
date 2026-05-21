import React from 'react'

const mockUser = { id: 22, email: 'larteas0@gmail.com', full_name: 'Usuario Demo', role_id: 2 }

export default function Profile(){
  const user = mockUser
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mi Perfil</h2>
      <div className="space-y-2">
        <div><strong>ID:</strong> {user.id}</div>
        <div><strong>Nombre:</strong> {user.full_name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Rol:</strong> {user.role_id}</div>
      </div>
      <p className="mt-4 text-sm text-slate-500">Esta vista es estática en la demo; se conectará al backend más adelante.</p>
    </div>
  )
}
