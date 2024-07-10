import React, {useContext, useMemo} from 'react';
import {tokenContext} from "../provider/tokenProvider";
import {noop, Table} from "@iqueue/ui-kit";
import moment from "moment/moment";

function History(props) {
  const {changeHistory} = useContext(tokenContext)

  const schema = useMemo(() => [
    {
      key: 'entity_name',
      title: 'Title',
      center: true,
      render: a => <h6>{a}</h6>
    },
    {
      key: 'field_changed',
      title: 'Field Changed',
      width: '15rem',
      render: (a, item) => {

        if (a === 'all') {
          return <div>quantity</div>;
        }

        const changedFields = a.split(', ');
        return (
          <ul>
            {changedFields.map((field, i) => {
              let fieldName = field.trim();

              switch (fieldName) {
                case 'manufacturer_id':
                  fieldName = 'manufacturer';
                  break;
                case 'supplier_id':
                  fieldName = 'supplier';
                  break;
                case 'category_id':
                  fieldName = 'category';
                  break;
                default:
                  break;
              }

              return (
                <li key={i}>
                  {fieldName}
                </li>
              );
            })}
          </ul>
        );
      }
    },
    {
      key: 'old_value',
      title: 'Old Value',
      width: '20rem',
      render: (a, item) => {
        let oldValue = {};
        if (item.old_value) {
          oldValue = JSON.parse(item.old_value);
        }
        const changedFields = item.field_changed.split(', ');

        return (
          <ul>
            {changedFields.map((field, index) => (
              <li key={index}>
                {oldValue[field] !== undefined ? oldValue[field] : '-'}
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      key: 'new_value',
      title: 'New Value',
      width: '20rem',
      render: (_, item) => {
        const newValue = JSON.parse(item.new_value);
        const changedFields = item.field_changed.split(', ');

        return (
          <ul>
            {changedFields.map((field, index) => (
              <li key={index}>
                {field === 'all' ? newValue.quantity : newValue[field]}
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      key: 'entity_type',
      title: 'Entity Type',
      width: '10rem',
      render: a => <h6>{a}</h6>,
      filterItems: ['Created', 'Updated', 'Deleted'],
      filterItemRender: (value) => ({
        key: value,
        title: value,
        inputTitle: value[0]
      }),
      filter: (val, item) => {
        if (val.length === 0) return true;
        return val.includes(item.entity_type);
      },
    },
    {
      key: 'changed_at',
      width: '20rem',
      title: 'Changed At',
      sort: noop,
      center: true,
      render: (v) => moment(v).format('lll'),
    }
  ], [])

  return (
    <Table
      schema={schema}
      entries={changeHistory}
      minWidth={'110rem'}
      indexable
    />
  );
}

export default History;