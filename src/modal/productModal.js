import React, {useCallback, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import {Input, Message, Modal, Row, Select} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";
import {tokenContext} from "../provider/tokenProvider";

function ProductModal({editValue}) {
  const {
    products,
    setProducts,
    manufacturers,
    models,
    suppliers,
    categories,
    isProducts,
    setIsProducts,
    productId,
    setProductId
  } = useContext(dataProvider);
  const {changeHistory, setChangeHistory, currentUser} = useContext(tokenContext)

  const saveChangeHistory = useCallback((changeRecord) => {
    const updatedChangeHistory = [...changeHistory, changeRecord];
    setChangeHistory(updatedChangeHistory);
    localStorage.setItem('changeHistory', JSON.stringify(updatedChangeHistory));
  }, [changeHistory, setChangeHistory]);

  const detectChanges = (oldProduct, newProduct) => {
    const changes = [];
    for (const key in newProduct) {
      if (newProduct[key] !== oldProduct[key]) {
        changes.push(key);
      }
    }
    return changes.join(', ');
  };

  const handleCreateAndUpdate = useCallback((val) => {
    if (productId) {
      const oldProduct = products.find(el => el.id === productId);
      const updatedProduct = products.map(el => el.id === productId ? {
        ...el, ...val,
        manufacturer_id: val.manufacturer_id.id ? val.manufacturer_id.id : val.manufacturer_id,
        model_id: val.model_id.id ? val.model_id.id : val.model_id,
        supplier_id: val.supplier_id.id ? val.supplier_id.id : val.supplier_id,
        category_id: val.category_id.id ? val.category_id.id : val.category_id,
      } : el);

      setProducts(updatedProduct);

      // Save change history for update
      const changes = detectChanges(oldProduct, {
        ...oldProduct,
        ...val
      });

      const changeRecord = {
        change_id: uuid(),
        entity_type: "Updated",
        entity_name: models.find(s => s.id === val.model_id.id)?.name ,
        entity_id: productId,
        changed_by: currentUser.id,
        field_changed: changes,
        old_value: JSON.stringify({
          ...oldProduct,
          manufacturer_id: manufacturers.find(m => m.id === oldProduct.manufacturer_id)?.name,
          model_id: models.find(m => m.id === oldProduct.model_id)?.name,
          supplier_id: suppliers.find(s => s.id === oldProduct.supplier_id)?.name,
          category_id: categories.find(c => c.id === oldProduct.category_id)?.name,
        }),
        new_value: JSON.stringify({
          ...updatedProduct.find(el => el.id === productId),
          manufacturer_id: manufacturers.find(m => m.id === val.manufacturer_id.id)?.name || val.manufacturer_id,
          model_id: models.find(s => s.id === val.model_id.id)?.name || val.model_id,
          supplier_id: suppliers.find(s => s.id === val.supplier_id.id)?.name || val.supplier_id,
          category_id: categories.find(c => c.id === val.category_id.id)?.name || val.category_id,
        }),
        changed_at: new Date().toISOString(),
        status: "Completed"
      };
      saveChangeHistory(changeRecord);

      Message({
        type: 'info',
        title: 'Successfully updated',
        timeout: 2000
      })
    } else {
      const productData = {
        ...val,
        manufacturer_id: val.manufacturer_id.id,
        model_id: val.model_id.id,
        supplier_id: val.supplier_id.id,
        category_id: val.category_id.id,
      };

      const newProduct = {
        id: val.id,
        ...productData,
        img: 'https://dummyimage.com/50x50'
      }

      // Save change history for creation
      const changeRecord = {
        change_id: uuid(),
        entity_type: "Created",
        entity_name: models.find(s => s.id === val.model_id.id)?.name,
        entity_id: newProduct.id,
        changed_by: currentUser.id,
        field_changed: "all",
        old_value: null,
        new_value: JSON.stringify({
          ...newProduct,
          manufacturer_id: manufacturers.find(m => m.id === val.manufacturer_id.id)?.name || val.manufacturer_id,
          model_id: models.find(s => s.id === val.model_id.id)?.name || val.model_id,
          supplier_id: suppliers.find(s => s.id === val.supplier_id.id)?.name || val.supplier_id,
          category_id: categories.find(c => c.id === val.category_id.id)?.name || val.category_id,
        }),
        changed_at: new Date().toISOString(),
        status: "Completed"
      };
      saveChangeHistory(changeRecord);

      setProducts(prevData => [...prevData, newProduct]);

      Message({
        type: 'success',
        title: 'Successfully created',
        timeout: 2000
      })
    }

    setIsProducts(false)
  }, [productId, products, setProducts, setIsProducts, categories, currentUser, manufacturers,models, saveChangeHistory, suppliers])

  return (
    <Modal
      title={productId ? 'Update product' : 'Create product'}
      isOpened={isProducts}
      onClose={() => {
        setIsProducts(false)
        setProductId('')
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
      <Input hidden value={productId ? productId : uuid()} name={'id'}/>
      <Row style={{width: '60vw'}}>
        <Select
          size={6}
          placeholder={'Title'}
          name={'model_id'}
          entries={models}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
          value={productId ? editValue.model_id : ''}
        />
        <Select
          size={6}
          placeholder={'Manufacturer'}
          name={'manufacturer_id'}
          entries={manufacturers}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
          value={productId ? editValue.manufacturer_id : ''}
        />
      </Row>
      <Row style={{width: '60vw'}}>
        <Select
          size={6}
          placeholder={'Supplier'}
          name={'supplier_id'}
          entries={suppliers}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
          value={productId ? editValue.supplier_id : ''}
        />
        <Select
          size={6}
          placeholder={'Category'}
          name={'category_id'}
          entries={categories}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
          value={productId ? editValue.category_id : ''}
        />
      </Row>
      <Row style={{width: '60vw'}}>
        <Input
          size={6}
          type={'number'}
          placeholder={'Quantity'}
          name={'quantity'}
          value={productId ? editValue.quantity : ''}
        />
        <Input
          size={6}
          type={'number'}
          placeholder={'Price'}
          name={'price'}
          value={productId ? editValue.price : ''}
        />
      </Row>
    </Modal>
  );
}

export default ProductModal;