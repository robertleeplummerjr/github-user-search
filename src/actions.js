const searchValue = 'APP::SEARCH_VALUE';
const searchData = 'APP::SEARCH_DATA';
const page = 'APP::PAGE';

function setSearchData(value) {
  return {
    type: searchData,
    value
  }
}

function setSearchValue(value) {
  return {
    type: searchValue,
    value
  }
}

function setPage(value) {
  return { type: page, value };
}

export default {
  searchData,
  setSearchData,
  searchValue,
  setSearchValue,
  page,
  setPage
};