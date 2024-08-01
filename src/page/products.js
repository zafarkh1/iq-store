import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button, Message, Pagination, Table} from "@iqueue/ui-kit";
import ProductModal from "../modal/productModal";
import {dataProvider} from "../provider/dataProvider";
import FilterProductModal from "../modal/filterProductModal";
import {tokenContext} from "../provider/tokenProvider";
import {v4 as uuid} from "uuid";
import {indexBy, map, prop} from "ramda";
import QRCode from 'qrcode.react';
import ProductQRCode from "../modal/productQRCode";

function Products() {
  const {
    products,
    manufacturers,
    models,
    suppliers,
    categories,
    setProducts,
    setIsProducts,
    setProductId,
  } = useContext(dataProvider)

  const asd = useMemo(() => {
    return {
      ids: map(prop('id'), manufacturers),
      indexed: indexBy(prop('id'), manufacturers)
    }
  }, [manufacturers])

  const {currentUser, setChangeHistory, changeHistory} = useContext(tokenContext)
  const [editValue, setEditValue] = useState({})
  const [isFilterProduct, setIsFilterProduct] = useState(false)
  const [selectedQRCode, setSelectedQRCode] = useState(null); // Состояние для QR-кода
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 25,
    total: products.length,
  })
  const defaultPageSizes = [15, 25, 50, 100, 200, 500]

  const saveChangeHistory = useCallback((changeRecord) => {
    const updatedChangeHistory = [...changeHistory, changeRecord];
    setChangeHistory(updatedChangeHistory);
    localStorage.setItem('changeHistory', JSON.stringify(updatedChangeHistory));
  }, [changeHistory, setChangeHistory]);


  const handleDelete = useCallback((id) => {
    const productToDelete = models.find(model => model.id === id);
    setProducts(prevData => prevData.filter(product => product.id !== id))

    // Save change history for deletion
    const changeRecord = {
      change_id: uuid(),
      entity_type: "Deleted",
      entity_name: productToDelete.name,
      entity_id: id,
      changed_by: currentUser.id,
      field_changed: "all",
      old_value: null,
      new_value: JSON.stringify(productToDelete),
      changed_at: new Date().toISOString(),
      status: "Completed"
    };
    saveChangeHistory(changeRecord);

    Message({
      type: 'error',
      title: 'Successfully deleted',
      timeout: 2000
    });
  }, [currentUser, saveChangeHistory, setProducts, models]);

  const generateQRCodeValue = (product, models, manufacturers, suppliers, categories) => {
    return JSON.stringify({
      id: product.id,
      model: models.find(item => item.id === product.model_id)?.name,
      manufacturer: manufacturers.find(item => item.id === product.manufacturer_id)?.name,
      supplier: suppliers.find(item => item.id === product.supplier_id)?.name,
      category: categories.find(item => item.id === product.category_id)?.name,
      quantity: product.quantity,
    });
  };

  const handlePrintQRCode = () => {}

  const schema = useMemo(() => [
    {
      key: 'model_id',
      title: 'Model',
      center: true,
      render: a => {
        const res = models.find(item => item.id === a)
        return res ? <div className='product-title-column'>
            <img src={res.imageUrl} alt={res.name} className="product_image"/>
            <h6>{res.name}</h6>
          </div>

          : <h6>{a}</h6>
      }
    },
    {
      key: 'manufacturer_id',
      title: 'Manufacturer',
      width: '15rem',
      center: true,
      filterItems: asd.ids,
      filterItemRender: (v) => ({
        key: v,
        title: asd.indexed[v].name
      }),
      filter: (values, item) => values.includes(item.manufacturer_id),
      render: a => {
        const res = manufacturers.find(item => item.id === a)
        return res ? <h6>{res.name}</h6> : <h6>{a}</h6>
      }
    },
    {
      key: 'supplier_id',
      title: 'Supplier',
      width: '15rem',
      center: true,
      render: a => {
        const res = suppliers.find(item => item.id === a)
        return res ? <h6>{res.name}</h6> : <h6>{a}</h6>
      }
    },
    {
      key: 'category_id',
      title: 'Category',
      width: '15rem',
      center: true,
      render: a => {
        const res = categories.find(item => item.id === a)
        return res ? <h6>{res.name}</h6> : <h6>{a}</h6>
      }
    },
    {
      key: 'quantity',
      title: 'Quantity',
      width: '8rem',
      center: true,
      render: a =>
        <h6
          style={{
            backgroundColor: a < 20 ? 'red' : a > 100 ? 'green' : 'orange',
            color: a > 20 && a <= 100 && 'black',
            borderRadius: '4px',
          }}
        >{a}</h6>
    },
    {
      key: 'a',
      title:
        <Button
          flat
          icon='filter_alt'
          primary
          onClick={() => setIsFilterProduct(true)}
        />,
      width: '5rem',
      render: (_, value) =>
        (currentUser.role === 'Admin' || currentUser.role === 'Warehouse Manager') && <Button
          id='delete-user'
          icon='delete'
          flat
          onClick={() => handleDelete(value.id)}
        />
    },
    {
      key: 'qr_code',
      title: 'QR Code',
      width: '10rem',
      render: (_, product) => {
        const qrCodeValue = generateQRCodeValue(product, models, manufacturers, suppliers, categories);
        return (
          <div id='delete-user' style={{display: 'flex', justifyContent: 'space-between'}}>
            <QRCode
              id='delete-user'
              size={32}
              value={qrCodeValue}
              onClick={() => {
                setSelectedQRCode(qrCodeValue);
                setIsQRCodeModalOpen(true);
              }}
              style={{ cursor: 'pointer' }}
            />
            <Button
              id='delete-user'
              flat
              onClick={() => handlePrintQRCode(product)}
            >
              Print
            </Button>
          </div>
        )
      }
    }
  ], [currentUser.role, handleDelete, categories, manufacturers, models, suppliers, asd])

  const handleEdit = id => {
    setIsProducts(true)
    setEditValue(products.find(item => item.id === id))
    setProductId(id)
  }

  const onPageChanged = page => {
    setPagination(prev => ({...prev, page}));
  };

  const onSizeChanged = size => {
    setPagination(prev => ({...prev, size, page: 1}));
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.size;
    return products.slice(startIndex, startIndex + pagination.size);
  }, [products, pagination.page, pagination.size]);


  return (
    <>
      <Table
        schema={schema}
        entries={paginatedProducts}
        minWidth='90rem'
        indexable
        onRowClick={(value, e) => {
          if (e.target.id !== 'delete-user') {
            handleEdit(value.id)
          }
        }}
      >
        <Pagination
          size={pagination.size}
          page={pagination.page}
          total={pagination.total}
          sizes={defaultPageSizes}
          onPageChanged={onPageChanged}
          onSizeChanged={onSizeChanged}
        />
      </Table>
      {currentUser.role !== 'Viewer' &&
        <ProductModal
          editValue={editValue}
          setEditValue={setEditValue}
        />}
      <FilterProductModal
        open={isFilterProduct}
        close={setIsFilterProduct}
      />
      <ProductQRCode
        open={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        value={selectedQRCode}
      />
    </>
  );
}

export default Products;