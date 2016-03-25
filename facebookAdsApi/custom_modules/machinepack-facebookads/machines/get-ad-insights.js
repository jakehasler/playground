module.exports = {


  friendlyName: 'get ad campaigns',


  description: 'get ad campaigns for a given ad account',


  extendedDescription: 'retrieves the ad account id for a given user',
  cacheable: true,

  inputs: {
    adAccountId: {
      example: 'act_230989',
      description: 'facebook ad account id',
      required: true
    },

    accessToken: {
      example: 'CAACEdEose0cBACBhZA7DJbYapwM7oZBt1EWhPiGqibBZAZAZCZCe6IOkfDRzrs1jyZCS93zSuj9GaNQQtxbny0jeSCqyBNaQUl3ocDiD3lO4GSboFm5B7NogSHFzTGYw0rdpndDKolQcfsS5nYeYwZAIKXF1WPzgGaGxNIDh36oZBHuazcN3WSNmL9jGyO9YmYlZBmZCcigBuMFvtXj4XlzNWyb',
      description: 'this is the facebook issued access token for a given user and app pair',
      required: true
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'The Facebook API returned an error (i.e. a non-2xx status code)',
    },

    success: {
      description: 'Here is an array of ad campaigns associated with the ad account.',
    },

  },


  fn: function (inputs, exits) {

    var doJSONRequest = require('../lib/do-request');

    // GET ad accounts/ and send the api token as a header
    return doJSONRequest({
      method: 'get',
      url: ['/v2.5/', inputs.adAccountId, '/insights'].join(""),
      data: {
        'access_token': inputs.accessToken,
        'fields' : '',
        'time_range': {"since":"2016-02-18","until":"2016-03-18"}
      },
      headers: {},
    }, function (err, responseBody) {
      if (err) { return exits.error(err); }
      return exits.success(responseBody);
    });
  }
};
