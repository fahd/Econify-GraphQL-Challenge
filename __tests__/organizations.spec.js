import chai from 'chai';
import chaiGraphQL from 'chai-graphql';
chai.use(chaiGraphQL);

const baseUrl = `http://localhost:${process.env.PORT || 9000}`;
const request = require('supertest')(baseUrl);
const expect = chai.expect;

const orgId = 1;

describe('GraphQL Organizations', () => {
  it('Returns all organizations', done => {
    request
      .post('/graphql')
      .send({
        query: `{ organizations { id name createdAt updatedAt }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.organizations[0]).to.have.property('id');
        expect(res.body.data.organizations[0]).to.have.property('name');
        expect(res.body.data.organizations[0]).to.have.property('createdAt');
        expect(res.body.data.organizations[0]).to.have.property('updatedAt');
        done();
      })
  });
  it('Returns single organization', done => {
    request
      .post('/graphql')
      .send({
        query: `{ organization(id:"${orgId}") { id name createdAt updatedAt }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.organization.id).to.equal('1');
        expect(res.body.data.organization.name).to.equal('Econify');
        done();
      })
  })

  it("Returns single organization's events", done => {
    request
      .post('/graphql')
      .send({
        query: `{ organization(id:"${orgId}") { events { name id description date time createdAt updatedAt} }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.organization.events.length).to.equal(2);
        expect(res.body.data.organization.events[0]).to.have.property('id');
        expect(res.body.data.organization.events[0]).to.have.property('name');
        expect(res.body.data.organization.events[0]).to.have.property('description');
        expect(res.body.data.organization.events[0]).to.have.property('date');
        expect(res.body.data.organization.events[0]).to.have.property('time');
        expect(res.body.data.organization.events[0]).to.have.property('createdAt');
        expect(res.body.data.organization.events[0]).to.have.property('updatedAt');
        done();
      })
  })

  it("Returns single organization's locations", done => {
    request
      .post('/graphql')
      .send({
        query: `{ organization(id:"${orgId}") { locations { id name createdAt updatedAt } }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.organization.locations.length).to.equal(2);
        expect(res.body.data.organization.locations[0]).to.have.property('id');
        expect(res.body.data.organization.locations[0]).to.have.property('name');
        expect(res.body.data.organization.locations[0]).to.have.property('createdAt');
        expect(res.body.data.organization.locations[0]).to.have.property('updatedAt');
        done();
      })
  })
});
