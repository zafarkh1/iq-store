import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Input, Message, Modal, Row} from "@iqueue/ui-kit";
import {tokenContext} from "../provider/tokenProvider";

function UserModal({editValue, setEditValue}) {
  const {users, setUsers, isUsers, setIsUsers, userId, setUserId} = useContext(tokenContext);

  const handleCreateAndUpdate = useCallback((val) => {
    if (userId) {
      const updatedUser = users.map(el => el.id === userId ? {
        ...el, ...val,
        updatedAt: new Date().toISOString()
      } : el);
      setUsers(updatedUser);
      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      const newUser = {
        ...val,
        role: "Viewer",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setUsers(prevData => [...prevData, newUser]);
      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }
    setIsUsers(false)
  }, [users, userId, setUsers, setIsUsers])

  return (
    <Modal
      title={userId ? 'Update' : 'Create user'}
      isOpened={isUsers}
      onClose={() => {
        setIsUsers(false)
        setUserId('')
      }}
      footerActions={[
        {
          title: "Close",
          danger: true
        },
        {
          title: "Submit",
          submit: true,
          primary: true
        }]}
      onApply={val => handleCreateAndUpdate(val)}
    >
      <Input hidden value={userId ? userId : uuid()} name={'id'}/>
      <Row style={{width: '40vw'}}>
        <Input
          size={12}
          placeholder={'Name'}
          name={'name'}
          value={userId ? editValue.name : ''}
        />
      </Row>
      <Row style={{width: '40vw'}}>
        <Input
          size={12}
          placeholder={'Username'}
          name={'username'}
          value={userId ? editValue.username : ''}
        />
      </Row>
      {!userId &&
        <Row style={{width: '40vw'}}>
          <Input
            size={12}
            type='password'
            placeholder={'Password'}
            name={'password'}
          />
        </Row>
      }
    </Modal>
  );
}

export default UserModal;