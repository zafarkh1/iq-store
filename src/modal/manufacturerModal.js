import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Col, Input, Message, Modal, Row} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";

function ManufacturerModal({editValue, setEditValue}) {
  const {
    manufacturers,
    setManufacturers,
    isManufacturers,
    setIsManufacturers,
    manufacturerId,
    setManufacturerId
  } = useContext(dataProvider);

  const handleCreateAndUpdate = useCallback((val) => {
    if (manufacturerId) {
      const updatedManufacturer= manufacturers.map(el => el.id === manufacturerId ? {
        ...el, ...val,
        updatedAt: new Date().toISOString()
      } : el);
      setManufacturers(updatedManufacturer);
      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      const newManufacturer = {
        ...val,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setManufacturers(prevData => [...prevData, newManufacturer]);
      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }
    setIsManufacturers(false)
  }, [manufacturerId, manufacturers, setManufacturers, setIsManufacturers])

  return (
    <Modal
      title={'Create manufacturer'}
      isOpened={isManufacturers}
      onClose={() => {
        setIsManufacturers(false)
        setManufacturerId('')
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
      <Input hidden value={manufacturerId ? manufacturerId : uuid()} name={'id'}/>
      <Row style={{width: '70vw'}}>
        <Col size={6}>
          <Input
            placeholder={'Name'}
            name={'name'}
            value={manufacturerId ? editValue.name : ''}
          />
        </Col>
        <Col size={6}>
          <Row>
            <Input
              size={6}
              placeholder={'Country'}
              name={'country'}
              value={manufacturerId ? editValue.country : ''}
            />
            <Input
              size={6}
              type='number'
              placeholder={'Contact phone'}
              name={'contact_phone'}
              value={manufacturerId ? editValue.contact_phone : ''}
            />
          </Row>
        </Col>
      </Row>
      <Row style={{width: '70vw'}}>
        <Input
          size={6}
          placeholder={'Email'}
          name={'email'}
          value={manufacturerId ? editValue.email : ''}
        />
        <Input
          size={6}
          placeholder={'Address'}
          name={'address'}
          value={manufacturerId ? editValue.address : ''}
        />
      </Row>


    </Modal>
  );
}

export default ManufacturerModal;