import {useContext} from 'react';
import {Col, Input, Modal, MultipleSelect, Row} from "@iqueue/ui-kit";
import {dataProvider} from "../provider/dataProvider";

function FilterProductModal({open, close}) {
  const {manufacturers, suppliers, categories} = useContext(dataProvider);

  return (
    <Modal
      title={'Filter product'}
      isOpened={open}
      onClose={() => {
        close(false)
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
      onApply={val => console.log(val)}
    >
      <Row>
        <MultipleSelect
          placeholder={'Manufacturer'}
          name={'manufacturers'}
          entries={manufacturers}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
        />
        <MultipleSelect
          placeholder={'Supplier'}
          name={'suppliers'}
          entries={suppliers}
          render={item => ({
            key: item.id,
            title: item.name,
          })}
        />
      </Row>
      <Row>
        <Col size={6}>
          <MultipleSelect
            placeholder={'Category'}
            name={'categories'}
            entries={categories}
            render={item => ({
              key: item.id,
              title: item.name,
            })}
          />
        </Col>
        <Col size={6}>
          <Input
            placeholder={'Quantity'}
            name={'quantity'}
            type={'range'}
            value={100}
            min={0}
            max={1000}
            step={5}
            onChange={(v) => {
              console.log('VAL:', v)
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default FilterProductModal;