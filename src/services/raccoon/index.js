const raccoon = require('raccoon');

raccoon.liked('garyId', 'movieId').then(() => {
  return raccoon.liked('garyId', 'movie2Id');
}).then(() => {
  return raccoon.liked('chrisId', 'movieId');
}).then(() => {
  return raccoon.recommendFor('chrisId', 10);
}).then((recs) => {
  console.log('recs', recs);
  // results will be an array of x ranked recommendations for chris
  // in this case it would contain movie2
});
