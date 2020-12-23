import React from 'react'
export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">Счетов пока нет</p>
  }
  return (
    <table className = "responsive-table">
      <thead>
      <tr>
        <th>№</th>
        <th>Счет фактура</th>
        <th>Детализация</th>
        <th>СУММА</th>
        <th>Дата</th>
      </tr>
      </thead>
      <tbody>
      { links.map((cash, index) => {
        return (
           <tr key={cash._id}>
            <td>{index+1}</td>
            <td>{cash.invoice}</td>
            <td>{cash.detail}</td>
            <td>{cash.amount}</td>
            <td>{cash.date}</td>
            </tr>
          )}
      )}
        </tbody> 
     </table>
  )
}
