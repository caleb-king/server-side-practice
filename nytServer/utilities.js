const compareTitles = ( a, b ) => {
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
};

const compareRank = ( a, b ) => {
  if ( a.rank < b.rank ){
    return -1;
  }
  if ( a.rank > b.rank ){
    return 1;
  }
  return 0;
};

exports.compareTitles = compareTitles;
exports.compareRank = compareRank;