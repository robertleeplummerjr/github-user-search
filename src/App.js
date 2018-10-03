import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from './actions';

import { updateSearch } from './simple-github';

import logo from './logo.svg';
import './App.css';
import reducer from './reducer';

const resultsPerPage = 30;

export class PureApp extends Component {
  static reducer = { app: reducer };
  static actions = actions;

  static get propTypes() {
    return {
      setSearchValue: PropTypes.func.isRequired,
      callbackName: PropTypes.string.isRequired,
      searchValue: PropTypes.string,
      searchData: PropTypes.object,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GitHub User Search</h1>
        </header>
        <form onSubmit={ (e) => {
          this.onSubmit(e)
        }}>
          <p className="App-intro">
            <input type="text" onChange={ (e) => this.props.setSearchValue(e.target.value) } />
            <input type="submit" value="Search" />
          </p>
          { this.renderResultCount() }
          { this.renderPageDetail() }
          { this.renderPaginationButtons() }
          { this.renderResults() }
          { this.renderPageDetail() }
          { this.renderPaginationButtons() }
        </form>
      </div>
    );
  }

  renderResultCount() {
    if (!this.props.searchData) return null;
    if (!this.props.searchData.total_count) return <div>None!</div>;
    return <div>{ `Found ${this.props.searchData.total_count} users!` }</div>;
  }

  renderPageDetail() {
    if (!this.props.searchData) return null;
    if (!this.props.searchData.total_count) return null;
    return <div>{ `Page ${ this.props.page } of ${ Math.ceil(this.props.searchData.total_count / resultsPerPage) }` }</div>;
  }

  renderResults() {
    if (!this.props.searchData) return null;
    if (!this.props.searchData.items) return null;

    return this.props.searchData.items.map(item => {
      return (
        <div key={item.id}>
          <img src={ item.avatar_url } style={{ width: 25 }} />
          <h3><a href={ item.html_url }>{ item.login }</a></h3>
          <p>{ item.type }</p>
        </div>
      );
    });
  }

  renderPaginationButtons() {
    return <div className={'pagination'}>
      { this.props.searchData && this.props.page > 1 ? <input type="button" key="previous" value="Previous" onClick={() => this.goPrevious() }/> : null }
      { this.props.searchData ? <input type="button" key="next" value="Next" onClick={() => this.goNext()}/> : null }
    </div>;
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setPage(1);
    updateSearch(this.props.searchValue, this.props.callbackName, 1);
  }

  goNext() {
    const page = this.props.page + 1;
    this.props.setPage(page);
    updateSearch(this.props.searchValue, this.props.callbackName, page);
  }

  goPrevious() {
    const page = Math.max(this.props.page - 1, 1);
    this.props.setPage(page);
    updateSearch(this.props.searchValue, this.props.callbackName, page);
  }
}

export function mapStateToProps(state) {
  const { searchValue, searchData, page } = state.app;
  return { searchValue, searchData, page };
}

export function mapDispatchToProps(dispatch) {
  return {
    setSearchValue: (value) => {
      dispatch(actions.setSearchValue(value));
    },
    setPage: (value) => {
      dispatch(actions.setPage(value))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PureApp);
