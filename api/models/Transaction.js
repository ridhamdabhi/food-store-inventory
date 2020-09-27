/**
 * Ingredients.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: "transaction_id",

  attributes: {
    transaction_id: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
  },
  datastore: "default",
};
