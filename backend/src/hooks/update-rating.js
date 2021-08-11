// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data, app } = context
    const ratings = await app.service('ratings').find({ query: { movieId: data.movieId } })
    const averageRating = (ratings.reduce((sum, el) => sum += el.rating, 0) / ratings.length).toFixed(2)
    await app.service('movies').patch(data.movieId, { rating: averageRating })
    return context;
  };
};
