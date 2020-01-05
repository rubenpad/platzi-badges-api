const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');
const debug = require('debug')('app:db');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  // Here we create the connection to the db
  // It return a promise with an instance
  // to the data base to use it in the CRUD methods.
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((error) => {
          if (error) reject(error);

          debug('Connected succesfully to Mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }
  // Mongo CRUD actions
  getAll(collection, query) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }
  // The action don't return an id
  // so we return the id passed as argument
  // to have reference of the deleted element
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
