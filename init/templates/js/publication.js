// { "path" : "imports/models/__modelName__/server/publications.js" }
// TODO: call this in entry file
export default function () {
  Meteor.publish('__modelName__'.toLowerCase(), function () {
    return __modelName__.find();
  });
}
