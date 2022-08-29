import chai from 'chai';
import chaiGraphQL from 'chai-graphql';
chai.use(chaiGraphQL);

const baseUrl = `http://localhost:${process.env.PORT || 9000}`;
const request = require('supertest')(baseUrl);
const expect = chai.expect;
const newEvent = {
  organizationId: 1,
  name: "Employee Onboarding",
  description: "Training and manuals for our new employees!",
  date: "2022-09-01",
  time: "08:08:08"
};

const eventOperations = {
  findEvent: 1,
  updateEvent: 3,
  deleteEvent: 4,
  eventIdfindParent:3
}

describe('GraphQL Events', () => {
  it('Returns single event', done => {
    request
      .post('/graphql')
      .send({
        query: `{ event(id:"${eventOperations.findEvent}") { id name description date time createdAt updatedAt }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.event.id).to.equal(eventOperations.findEvent.toString());
        expect(res.body.data.event).to.have.property('name');
        expect(res.body.data.event).to.have.property('description');
        expect(res.body.data.event).to.have.property('date');
        expect(res.body.data.event).to.have.property('time');
        expect(res.body.data.event).to.have.property('createdAt');
        expect(res.body.data.event).to.have.property('updatedAt');
        done();
      })
  })

  it('Creates an event, returning an event', done => {
    request
      .post('/graphql')
      .send({
        query: `
        mutation { 
          createEvent(
            organizationId:"${newEvent.organizationId}"
            eventName:"${newEvent.name}"
            description:"${newEvent.description}"
            date:"${newEvent.date}"
            time:"${newEvent.time}"
          ){ 
          name 
          description 
          date 
          time
         }
       }`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.createEvent.name).to.equal(newEvent.name);
        expect(res.body.data.createEvent.description).to.equal(newEvent.description);
        expect(res.body.data.createEvent.date).to.equal(newEvent.date);
        expect(res.body.data.createEvent.time).to.equal(newEvent.time);
        done();
      })
  })

  it('Updates an event and returns it.', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { updateEvent(id:"${eventOperations.updateEvent}" eventName:"${newEvent.name}") { id name }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.updateEvent.id).equal(eventOperations.updateEvent.toString());
        expect(res.body.data.updateEvent.name).equal(newEvent.name);
        done();
      })
  })

  it('Deletes an event and returns its id.', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { deleteEvent(id:"${eventOperations.deleteEvent}") }`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.deleteEvent).equal(eventOperations.deleteEvent);
        done();
      })
  })

  it("Finds an event's parent organization", done => {
    request
      .post('/graphql')
      .send({
        query: `{ event(id:"${eventOperations.eventIdfindParent}") { organization { id name } }}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).equal(200);
        expect(res.body.data.event.organization).to.have.property('id');
        expect(res.body.data.event.organization).to.have.property('name');
        done();
      })
  })
});
