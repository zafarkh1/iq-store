import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Input, Message, Modal, Row} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";

function CategoryModal({editValue, setEditValue}) {
  const {
    categories,
    setCategories,
    isCategories,
    setIsCategories,
    categoryId,
    setCategoryId
  } = useContext(dataProvider);

  const handleCreateAndUpdate = useCallback((val) => {
    if (categoryId) {
      const updatedCategory = categories.map(el => el.id === categoryId ? {
        ...el, ...val,
      } : el);
      setCategories(updatedCategory);
      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      setCategories(prevData => [...prevData, ...val]);
      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }
    setIsCategories(false)
  }, [categoryId, categories, setCategories, setIsCategories])

  return (
    <Modal
      title={'Create category'}
      isOpened={isCategories}
      onClose={() => {
        setIsCategories(false)
        setCategoryId('')
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
      <Input hidden value={categoryId ? categoryId : uuid()} name={'id'}/>
      <Row style={{ width: '50vw' }}>
          <Input
            size={12}
            placeholder={'Title'}
            name={'name'}
            value={categoryId ? editValue.name : ''}
          />
      </Row>

      <Row style={{ width: '50vw' }}>
          <Input
            size={12}
            placeholder={'Description'}
            name={'description'}
            value={categoryId ? editValue.description : ''}
          />
      </Row>


    </Modal>
  );
}

export default CategoryModal;