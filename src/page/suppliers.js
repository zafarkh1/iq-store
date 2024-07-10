import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Table} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";
import SupplierModal from "../modal/supplierModal";
import {tokenContext} from "../provider/tokenProvider";

function Supplier(props) {
  const {suppliers, setSuppliers, setIsSuppliers, setSupplierId} = useContext(dataProvider)
  const {currentUser} = useContext(tokenContext)
  const [editValue, setEditValue] = useState([])

  const handleDelete = useCallback((id) => {
    setSuppliers(prevData => prevData.filter(product => product.id !== id))
    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    })
  }, [setSuppliers])

  const schema = useMemo(() => [
    {
      key: 'name',
      title: 'Name',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'contact_phone',
      title: 'Contact phone',
      width: '15rem',
      center: true,
      render: b => <h6>{b}</h6>
    },
    {
      key: 'email',
      title: 'Email',
      width: '20rem',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'address',
      title: 'Address',
      width: '20rem',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'a',
      width: '5rem',
      render: (_, value) =>
        <Button
          id='delete-user'
          icon='delete'
          flat
          onClick={() => handleDelete(value.id)}
        />
    }
  ], [handleDelete])

  const handleEdit = id => {
    setIsSuppliers(true)
    setEditValue(suppliers.find(item => item.id === id))
    setSupplierId(id)
  }

  return (
    <>
      <Table
        schema={schema}
        entries={suppliers}
        minWidth='80rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      />
      {currentUser.role === 'Admin' &&
        <SupplierModal
          editValue={editValue}
          setEditValue={setEditValue}
        />}
    </>
  );
}

export default Supplier;