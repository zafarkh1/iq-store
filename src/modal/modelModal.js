import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Input, Message, Modal, Row} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";

function ModelModal({editValue, setEditValue}) {
  const {
    models,
    setModels,
    isModels,
    setIsModels,
    modelId,
    setModelId
  } = useContext(dataProvider);

  const handleCreateAndUpdate = useCallback((val) => {
    if (modelId) {
      const updatedCategory = models.map(el => el.id === modelId ? {
        ...el, ...val,
      } : el);
      setModels(updatedCategory);
      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      const newCategory = {
        ...val,
        imageUrl: 'https://dummyimage.com/50x50'

      }

      setModels(prevData => [...prevData, newCategory]);
      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }
    setIsModels(false)
  }, [modelId, models, setModels, setIsModels])

  return (
    <Modal
      title={'Create model'}
      isOpened={isModels}
      onClose={() => {
        setIsModels(false)
        setModelId('')
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
      <Input hidden value={modelId ? modelId : uuid()} name={'id'}/>
      <Row style={{ width: '50vw' }}>
        <Input
          size={12}
          placeholder={'Title'}
          name={'name'}
          value={modelId ? editValue.name : ''}
        />
      </Row>

      <Row style={{ width: '50vw' }}>
        <Input
          size={12}
          placeholder={'Description'}
          name={'description'}
          value={modelId ? editValue.description : ''}
        />
      </Row>
    </Modal>
  );
}

export default ModelModal;