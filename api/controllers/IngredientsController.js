/**
 * IngredientsController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  sendJson:function(req, res){
      Ingredients.find({}).exec(function(err, ingredients){
          if(err){
              console.log('Ingredients API::Failed to fetch Ingredients in sendJson function')
              res.send(500, {error: 'Ingredients API::Failed to fetch Ingredients in sendJson function'});
          }
          console.log('Ingredients API::Ingredients list fetched successfully in sendJson function');
          res.send(ingredients);
    });
    return false;
  },
  getIngredientByID: function(req, res){
      Ingredients.findOne({id: req.body.id}).exec(function(err, ingredient){
          if(err){
              console.log('Ingredients API::Failed to fetch Ingredients in sendJson function')
              res.send(500, {error: 'Ingredients API::Failed to fetch Ingredients in sendJson function'});
          }
          console.log('Ingredients API::Ingredients list fetched successfully in sendJson function');
          res.send(ingredient);
    });
    return false;
  },
	list:function(req, res){
        Ingredients.find({}).exec(function(err, ingredients){
            if(err){
                console.log('Ingredients API::Failed to fetch Ingredients in list function')
                res.send(500, {error: 'Ingredients API::Failed to fetch Ingredients in list function'});
            }
            console.log('Ingredients API::Ingredients list fetched successfully in list function');
            res.view('pages/list', {ingredients:ingredients});
        });
        return false;
    },
    add: function(req, res){
        console.log('Ingredients API::add function called');
        res.view('pages/add');
    },
    create:function(req, res){
        var ingredientName = (req.body.ingredientName).toUpperCase();
        var ingredientId = req.body.ingredientId;
        var ingredientQoh = req.body.ingredientQoh;

        Ingredients.find({id:ingredientId}).exec(function(err, ingredient){
            if(err){
                console.log('Ingredients API::Failed to fetch Ingredient in create function');
                res.send(500, {error: 'Ingredients API::Failed to fetch Ingredient in create function'});
            }
            else if(ingredient != null){
                Ingredients.create({id: ingredientId, ingredientName:ingredientName, ingredientQoh:ingredientQoh}).exec(function(err){
                    if(err){
                        console.log('Ingredients API::Failed to create Ingredient in create function');
                        res.send(500, {error: 'Ingredients API::Failed to create Ingredient in create function'});
                    }
                    console.log('Ingredients API::Ingredient Created Successfully - ingredientName:'+ingredientName+' ingredientQoh:'+ingredientQoh);
                    res.redirect('/list');
                });
            }
        });
    },
    edit: function(req, res){
        Ingredients.findOne({id:req.body.id}).exec(function(err, ingredient){
            if(err){
                console.log('Ingredients API::Failed to fetch Ingredient in edit function');
                res.send(500, {error: 'Ingredients API::Failed to fetch Ingredient in edit function'});
            }
            console.log('Ingredients API::edit function called for ingredientId:'+req.body.id);
            res.view('pages/edit', {ingredient:ingredient});
        });
    },
    update: function(req, res){
        var ingredientName = (req.body.ingredientName).toUpperCase();
        var ingredientId = req.body.id;
        var ingredientQoh = req.body.ingredientQoh;

        Ingredients.update({id: ingredientId},{ingredientName:ingredientName, ingredientQoh:ingredientQoh}).exec(function(err){
            if(err){
                console.log('Ingredients API::Failed to update Ingredient in update function');
                res.send(500, {error: 'Ingredients API::Failed to update Ingredient in update function'});
            }
            console.log('Ingredients API::Ingredient Updated Successfully - ingredientId:'+ingredientId+' ingredientName:'+ingredientName+' ingredientQoh:'+ingredientQoh);
            res.redirect('/list');
        });
        return false;
    },
};
