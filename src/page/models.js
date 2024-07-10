import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Table} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";
import {tokenContext} from "../provider/tokenProvider";
import ModelModal from "../modal/modelModal";

function Models(props) {
  const {models, setModels, setIsModels, setModelId} = useContext(dataProvider)
  const {currentUser} = useContext(tokenContext)
  const [editValue, setEditValue] = useState([])

  const handleDelete = useCallback((id) => {
    setModels(prevData => prevData.filter(product => product.id !== id))
    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    })
  }, [setModels])

  const schema = useMemo(() => [
    {
      key: 'imageUrl',
      title: 'Img',
      center: true,
      width: '7rem',
      render: (a, val) => <img src={a} alt={val.name} className="product_image" />
    },
    {
      key: 'name',
      title: 'Title',
      center: true,
      width: '25rem',
      filter: (value, item) => item.name ? item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : false,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'description',
      title: 'Description',
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
    setIsModels(true)
    setEditValue(models.find(item => item.id === id))
    setModelId(id)
  }

  return (
    <>
      <Table
        schema={schema}
        entries={models}
        minWidth='85rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      />
      {currentUser.role === 'Admin' &&
        <ModelModal
          editValue={editValue}
          setEditValue={setEditValue}
        />}
    </>
  );
}

export default Models;