var db = require( '../config' );
var Step = require( './step' );
var User = require( './user' );
var Ingredient = require( './ingredient' );
var Tool = require( './tool' );

var Event = db.Model.extend( {
  tableName: 'events',

  steps: function () {
    return this.hasMany( Step );
  },

  chef: function () {
    return this.belongsTo( User );
  },

  ingredients: function () {
    return this.hasMany( Ingredient );
  },

  tools: function () {
    return this.hasMany( Tool );
  }

}, {

  fetchEvent: function ( id ) {
    return new this( { id: id } ).fetch( {
      require: true,
      withRelated: [
        'ingredients',
        'steps',
        'chef',
        'tools'
        ],
    } );
  },

  eventDetails: function () {
    var event = {};
    //Data is going to go here

    event.name = this.get( 'name' );
    event.description = this.get( 'description' );
    event.ingredients = this.related( 'ingredients' ).toJSON();
    event.steps = this.related( 'steps' ).toJSON();
    event.chef = this.related( 'chef' ).toJSON();
    event.tools = this.related( 'tools' ).toJSON();

    return event;
  }

});

module.exports = Event;