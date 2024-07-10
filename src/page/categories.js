import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Table} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";
import CategoryModal from "../modal/categoryModal";
import {tokenContext} from "../provider/tokenProvider";

function Categories(props) {
  const {categories, setCategories, setIsCategories, setCategoryId} = useContext(dataProvider)
  const {currentUser} = useContext(tokenContext)
  const [editValue, setEditValue] = useState([])

  const handleDelete = useCallback((id) => {
    setCategories(prevData => prevData.filter(product => product.id !== id))
    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    })
  }, [setCategories])

  const schema = useMemo(() => [
    {
      key: 'name',
      title: 'Name',
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
    setIsCategories(true)
    setEditValue(categories.find(item => item.id === id))
    setCategoryId(id)
  }

  return (
    <>
      <Table
        schema={schema}
        entries={categories}
        minWidth='65rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      />
      {currentUser.role === 'Admin' &&
        <CategoryModal
          editValue={editValue}
          setEditValue={setEditValue}
        />}
    </>
  );
}

export default Categories;