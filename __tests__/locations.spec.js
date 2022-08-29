import chai from 'chai';
import chaiGraphQL from 'chai-graphql';
chai.use(chaiGraphQL);

const baseUrl = `http://localhost:${process.env.PORT || 9000}`;
const request = require('supertest')(baseUrl);
const expect = chai.expect;
const newLocation = {
  organizationId: 1,
  name: "The Barn"  
};
const updatedLocation = "Wimbledon";

const locationOperations = {
  findLocation: 1,
  updateLocation: 3,
  deleteLocation: 4,
  locationIdfindParent:3
}

describe('GraphQL Events', () => {
  it('Returns single location', done => {
    request
      .post('/graphql')
      .send({
        query: `{ location (id:"${locationOperations.findLocation}") { id name  } }`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.location.id).to.equal(locationOperations.findLocation.toString());
        expect(res.body.data.location).to.have.property('name');
        done();
      })
  });


  it('Creates a location, returning a location', done => {
    request
      .post('/graphql')
      .send({
        query: `
        mutation {
          createLocation(
            organizationId:"${newLocation.organizationId}"
            locationName:"${newLocation.name}"
          ){
          id
          name
         }
       }`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.createLocation.name).to.equal(newLocation.name);
        done();
      })
  });

  it('Updates a location and returns it.', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { updateLocation(id:"${locationOperations.updateLocation}" locationName:"${updatedLocation}") { id name }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.updateLocation.id).equal(locationOperations.updateLocation.toString());
        expect(res.body.data.updateLocation.name).equal(updatedLocation);
        done();
      });
  });


  it('Deletes a location and returns its id.', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { deleteLocation(id:"${locationOperations.deleteLocation}") }`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.deleteLocation).equal(locationOperations.deleteLocation);
        done();
      })
  })

  it("Finds a location's parent organization", done => {
    request
      .post('/graphql')
      .send({
        query: `{ location(id:"${locationOperations.locationIdfindParent}") { organization { id name } }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.location.organization).to.have.property('id');
        expect(res.body.data.location.organization).to.have.property('name');
        done();
      })
  })
});
