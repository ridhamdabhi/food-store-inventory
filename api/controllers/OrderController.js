/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var flaverr = require("flaverr");

module.exports = {
  transaction: async function (req, res) {
    let id = req.body.id;
    let action = req.body.action;

    if (action == "commit") {
      let ingredients = req.body.ingredients;

      await sails
        .getDatastore()
        .transaction(async (db) => {
          await Transaction.create({
            transaction_id: id,
            status: "success",
          }).usingConnection(db);

          for (let index in ingredients) {
            let ingredient = await Ingredients.findOne({
              id: ingredients[index].id,
            }).usingConnection(db);

            if (!ingredient) {
              throw flaverr(
                "INGREDIENT_NOT_FOUND",
                new Error("ingredient not found")
              );
            }

            var ingredientQoh =
              ingredient.ingredientQoh - ingredients[index].quantity;

            if (ingredientQoh < 0) {
              throw flaverr(
                "QUANTITY_OUT_OF_STOCK",
                new Error("quantity out of stock")
              );
            }

            await Ingredients.update({ id: ingredients[index].id })
              .set({ ingredientQoh: ingredientQoh })
              .usingConnection(db);

            await Order.create({
              transaction_id: id,
              ingredient_id: ingredients[index].id,
              quantity: ingredients[index].quantity,
            }).usingConnection(db);
          }
        })
        .intercept("INGREDIENT_NOT_FOUND", () => {
          res.status(200).send({
            status: "failed",
            message: "INGREDIENT_NOT_FOUND",
          });
          return;
        })
        .intercept("QUANTITY_OUT_OF_STOCK", () => {
          res.status(200).send({
            status: "failed",
            message: "QUANTITY_OUT_OF_STOCK",
          });
          return;
        });

      res.status(200).send({
        status: "success",
      });
    } else if (action == "rollback") {
      Transaction.update({ transaction_id: id })
        .set({ status: "failed" })
        .exec(function (error) {});

      let orders = await Order.find({ transaction_id: id });

      for (let index in orders) {
        let ingredient = await Ingredients.findOne({
          id: orders[index].ingredient_id,
        });

        Ingredients.update({ id: orders[index].ingredient_id })
          .set({
            ingredientQoh: ingredient.ingredientQoh + orders[index].quantity,
          })
          .exec(function (error) {});
      }

      res.status(200).send({
        status: "success",
      });
    }
  },
};
