import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Table} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";
import ManufacturerModal from "../modal/manufacturerModal";
import {tokenContext} from "../provider/tokenProvider";

function Supplier(props) {
  const {manufacturers, setManufacturers, setIsManufacturers, setManufacturerId} = useContext(dataProvider)
  const {currentUser} = useContext(tokenContext)
  const [editValue, setEditValue] = useState([])

  const handleDelete = useCallback((id) => {
    setManufacturers(prevData => prevData.filter(product => product.id !== id))
    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    })
  }, [setManufacturers])

  const schema = useMemo(() => [
    {
      key: 'name',
      title: 'Name',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'country',
      title: 'Country',
      width: '15rem',
      center: true,
      render: b => <h6>{b}</h6>
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
    setIsManufacturers(true)
    setEditValue(manufacturers.find(item => item.id === id))
    setManufacturerId(id)
  }

  return (
    <>
      <Table
        schema={schema}
        entries={manufacturers}
        minWidth='100rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      />
      {currentUser.role === 'Admin' &&
        <ManufacturerModal
          editValue={editValue}
          setEditValue={setEditValue}
        />}
    </>
  );
}

export default Supplier;