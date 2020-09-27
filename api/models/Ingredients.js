/**
 * Ingredients.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'id',

  attributes: {

    ingredientName:{
      type: 'string',
      required: true
    },
    ingredientQoh:{
      type:'number',
      required: true
    }
  },
  datastore:'default'
};

