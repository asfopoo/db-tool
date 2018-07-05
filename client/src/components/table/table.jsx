import React, {Component,} from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

export class Table extends Component {
  render() {
    console.log(this.props);
    return (
      <ReactTable
        data={this.props.data}
        columns={this.props.columns}
        defaultPageSize={this.props.size}
        pages={this.props.pages}
        loading={this.props.loading}
        minRows={0}
        manual
        showPagination={false}
        multiSort={false}
        className={'-highlight'}
        noDataText={this.props.noDataText}
      />
    );
  }
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.number.isRequired,
    size: PropTypes.number,
    noDataText: PropTypes.string,
};
