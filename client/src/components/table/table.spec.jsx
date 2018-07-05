import React from 'react';

import {
  Table,
} from "./table";

import moment from "moment/moment";

import {
  render,
} from 'enzyme';

let sampleData = [
  {rma_number: '1', rl_rma_workflow_status_name: 'Authorized', order_create_date: '2018-05-09 15:43:22.211489 -04:00',
    create_date: '2018-03-26 13:25:47.245770 -04:00',},
];

let buttonInfo = {
  baseURL: '/originate/rma/',
  icon: 'fa-search',
};

const columns = buttonInfo => {
  return ([
    {Header: 'RMA Number', accessor: 'rma_number',
      Cell: row => (
        <span>
            <a href={buttonInfo.baseURL+`${row.value}`}>{row.value}</a>
          </span>
      ), width: 100,
    },
    {Header: 'Order Date', accessor: 'order_create_date', minWidth: 100,
      Cell: row => (
        <span>{moment(row.value.substr(0,10)).format('MMM DD, YYYY')}</span>
      ),
    },
    {Header: 'RMA Date', accessor: 'create_date', minWidth: 100,
      Cell: row => (
        <span>{moment(row.value.substr(0,10)).format('MMM DD, YYYY')}</span>
      ),
    },
    {Header: 'Status', accessor: 'rl_rma_workflow_status_name',
      Cell: row => (
        <span className='label label-as-badge label-default vertical-align' style={{fontSize: '12px',}}>
            {row.value}
          </span>
      )
    },
    {Header: 'Actions', accessor: 'actions', maxWidth: 100, sortable: false,
      Cell: ({row, original}) => (
        <span className='stretch'>
            <a href={buttonInfo.baseURL+`${original.rma_number}`}>
              <span className='btn btn-primary btn-sm marginRight'>
                <i className={'fas ' + buttonInfo.icon}/>
              </span>
            </a>
            <a className='btn btn-danger btn-sm' onClick={()=>{deleteItemFromDatabase(original.rma_number)}}>
              <i className='fas fa-trash'/>
            </a>
          </span>
      ),
    }
  ]);
};

const tableParts = sampleData => {
  return {
    loading: false,
    pages: 1,
    data: sampleData,
    size: 25,
    noDataText: 'No RMAs were found.',
    columns: columns(buttonInfo),
}
};

describe('Checks different buttons in columns', () => {
  test('renders correctly with originate buttonInfo', ()=> {
    let table = render(<Table tableParts={tableParts(sampleData)} />);
    expect(table).toMatchSnapshot();
  });

  buttonInfo = {
    baseURL: '/collector/rma/',
    icon: 'fa-magic',
  };

  test('renders correctly with collector buttonInfo', ()=>{
    let table = render(<Table tableParts={tableParts(sampleData)} />);
    expect(table).toMatchSnapshot();
  });
});

describe('Checks class change on status column change', () => {
  sampleData[0].rl_rma_workflow_status_name = 'Rejected';

  test('renders a red background on a rejected RMA', ()=>{
    let table = render(<Table tableParts={tableParts(sampleData)} />);
    expect(table).toMatchSnapshot();
  });

  sampleData[0].rl_rma_workflow_status_name = 'Received';

  test('renders a green background on a received RMA', ()=>{
    let table = render(<Table tableParts={tableParts(sampleData)} />);
    expect(table).toMatchSnapshot();
  });

  sampleData[0].rl_rma_workflow_status_name = 'Processed';

  test('renders a blue background on a processed RMA', ()=>{
    let table = render(<Table tableParts={tableParts(sampleData)} />);
    expect(table).toMatchSnapshot();
  });
});
