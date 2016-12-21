// { "path" : "imports/models/__modelName__/server/publications.js" }
import __modelName__ from '../__modelName__';

// TODO: call this in entry file
export default function () {
    Meteor.publish('__collectionName__', function () {
        return __modelName__.find();
    });
}
