import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setKeyword, searchVideos } from '../redux/actions'
import IconSearch from './IconSearch';

class Search extends Component {

  // handlers
  handleKeywordChange(e) {
    const keyword = e.currentTarget.value;
    const { searchVideos, setKeyword } = this.props;
    searchVideos(keyword);
    setKeyword(keyword);
  }

  render() {
    const { keyword, activeSection } = this.props;
    if (activeSection !== 'search') return null;
    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          onChange={(e) => this.handleKeywordChange(e)}
          value={keyword}
        />
        <IconSearch/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  keyword: state.searchKeyword,
  activeSection: state.activeSection,
});

const mapDispatchToProps = {
  setKeyword,
  searchVideos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);