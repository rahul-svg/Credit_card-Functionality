import React from 'react'

function Readrow({customer, handleDeleteClick}) {
    return (
        <tr>
            <td>{customer.cr1}{customer.cr2}{customer.cr3}{customer.cr4}</td>
            <td>{customer.fullName}</td>
            <td>{customer.cvv}</td>
            <td>
            <button type="button" onClick={() => handleDeleteClick(customer.id)}>
          Delete
        </button>
            </td>
        </tr>
    )
}

export default Readrow
