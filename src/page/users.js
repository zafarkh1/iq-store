import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Table} from "@iqueue/ui-kit";
import UserModal from "../modal/userModal";
import {tokenContext} from "../provider/tokenProvider";

function Users() {
  const {users, setUsers, setIsUsers, setUserId} = useContext(tokenContext)
  const [editValue, setEditValue] = useState([])

  const handleDelete = useCallback((id) => {
    setUsers(prevData => prevData.filter(user => user.id !== id))
    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    })
  }, [setUsers])

  const schema = useMemo(() => [
    {
      key: 'name',
      title: 'Name',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'role',
      title: 'Role',
      width: '20rem',
      center: true,
      render: b => <h6>{b}</h6>
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
          disabled={value.role === 'Admin'}
        />
    }
  ], [handleDelete])

  const handleEdit = id => {
    setIsUsers(true)
    setEditValue(users.find(item => item.id === id))
    setUserId(id)
  }

  return (
    <>
      <Table
        schema={schema}
        entries={users}
        minWidth='50rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      />
      <UserModal
        editValue={editValue}
        setEditValue={setEditValue}
      />
    </>
  );
}

export default Users;