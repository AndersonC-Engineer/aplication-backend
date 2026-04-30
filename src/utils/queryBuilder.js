// src/utils/queryBuilder.js
// Genera consultas SQL dinámicas para actualizaciones parciales de registros.
const buildUpdateQuery = (table, fields, id, timestampField = 'updated_at') => {
  const keys = Object.keys(fields);

  if (!keys.length) {
    throw new Error('No hay campos para actualizar');
  }

  const columns = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(fields);
  const timestampClause = timestampField ? `, ${timestampField} = now()` : '';
  const query = `UPDATE ${table} SET ${columns}${timestampClause} WHERE id = $${keys.length + 1} RETURNING *`;

  return {
    query,
    values: [...values, id],
  };
};

module.exports = {
  buildUpdateQuery,
};
