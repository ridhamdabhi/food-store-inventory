/**
 * Ingredients.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: "id",

  attributes: {
    id: {
      type: "number",
      autoIncrement: true,
    },
    transaction_id: {
      type: "string",
      required: true,
    },
    ingredient_id: {
      type: "number",
      required: true,
    },
    quantity: {
      type: "number",
      required: true,
    },
  },
  datastore: "default",
};
