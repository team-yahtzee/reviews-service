getPaginatedItems = (items, offset) => {
  return items.slice(offset, offset + 7);
}

sortReviews = dates => {
  return dates.sort((a, b) => {
    const dateA = new Date(a.date.replace(' ', ', '));
    const dateB = new Date(b.date.replace(' ', ', '));
    return dateB - dateA;
  });
}

module.exports.sortReviews = sortReviews;
module.exports.getPaginatedItems = getPaginatedItems;