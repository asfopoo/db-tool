import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  constructor(props) {
    super(props);
    this.showPrevious = this.showPrevious.bind(this);
    this.showNext = this.showNext.bind(this);
  }

  showPrevious() {
    if (this.props.currentPage === 1) {
      return 'disabled';
    }
  }

  showNext() {
    if (this.props.currentPage === this.props.totalPages)
      return 'disabled';
  }

  createNumbers() {
    let page = this.props.currentPage;
    let total = this.props.totalPages;
    let max = Math.min(this.props.maxSize, total);
    let prior = Math.floor(max/2);

    let tmp = max + page - prior - 1;
    if (tmp > total) {
      prior += tmp - total;
    }

    let arr = [];

    for (let i = prior; i > 0; i--){
      if (page - i > 0)
        arr.push(page - i);
    }

    let post = max - arr.length;
    for (let i = 0; i < post; i++){
      if (page + i <= total)
        arr.push(page + i);
    }

    return arr;
  }

  render() {
    let nums = this.createNumbers();
    let arr = nums.map(item => (
      <li key={item}>
        <button onClick={()=>{this.props.callback(item)}} className={this.props.currentPage === item ? 'currentSelection' : ''}>
          {item}
        </button>
      </li>
    ));
    return (
      <ul className='paging'>
        <li>
          <button onClick={()=>{this.props.callback(1)}} className={this.showPrevious()}>
            First
          </button>
        </li>
        <li>
          <button onClick={()=>{this.props.callback(this.props.currentPage - 1)}} className={this.showPrevious()}>
            Previous
          </button>
        </li>
        {arr}
        <li>
          <button onClick={()=>{this.props.callback(this.props.currentPage + 1)}} className={this.showNext()}>
            Next
          </button>
        </li>
        <li>
          <button onClick={()=>{this.props.callback(this.props.totalPages)}} className={this.showNext()}>
            Last
          </button>
        </li>
      </ul>
    );
  }
}

Pagination.defaultProps = {
  maxSize: 5,
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxSize: PropTypes.number,
};
