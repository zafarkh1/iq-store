import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Input, Message, Modal, Row} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";

function ProductModal({editValue, setEditValue}) {
  const {suppliers, setSuppliers, isSuppliers, setIsSuppliers, supplierId, setSupplierId} = useContext(dataProvider);

  const handleCreateAndUpdate = useCallback((val) => {
    if (supplierId) {
      const updatedSupplier = suppliers.map(el => el.id === supplierId ? {
        ...el, ...val,
        updatedAt: new Date().toISOString()
      } : el);
      setSuppliers(updatedSupplier);
      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      const newSupplier = {
        ...val,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setSuppliers(prevData => [...prevData, newSupplier]);
      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }
    setIsSuppliers(false)
  }, [supplierId, suppliers, setSuppliers, setIsSuppliers])


  return (
    <Modal
      title={'Create supplier'}
      isOpened={isSuppliers}
      onClose={() => {
        setIsSuppliers(false)
        setSupplierId('')
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
      <Input hidden value={supplierId ? supplierId : uuid()} name={'id'}/>
      <Row style={{ width: '60vw' }}>
        <Input
          size={6}
          placeholder={'Name'}
          name={'name'}
          value={supplierId ? editValue.name : ''}
        />
        <Input
          size={6}
          type='number'
          placeholder={'Contact phone'}
          name={'contact_phone'}
          value={supplierId ? editValue.contact_phone : ''}
        />
      </Row>
      <Row style={{ width: '60vw' }}>
        <Input
          size={6}
          placeholder={'Email'}
          name={'email'}
          value={supplierId ? editValue.email : ''}
        />
        <Input
          size={6}
          placeholder={'Address'}
          name={'address'}
          value={supplierId ? editValue.address : ''}
        />
      </Row>
    </Modal>
  );
}

export default ProductModal;