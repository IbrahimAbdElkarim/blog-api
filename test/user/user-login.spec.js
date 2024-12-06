const req = require('../request');
const { rollbackDb } = require('../db/rollbackfor-db');
const { UserFactory } = require('../factories/userFactory');
const ERRORS = require('../../error/errors');

const route = '/api/user/login/';


describe('User login suite case', () => {
  afterEach(async () => {
    await rollbackDb();
  });

  it('error-user-not found', async () => {
    const response = await req
      .post(route)
      .set('Accept', 'application/json')
      .send({
        email: 'user@email.com',
        password: 'Aa@123456'
      })
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe(ERRORS.USER_NOT_FOUND);
    expect(response.body.success).toBe(false);
    expect(response.body.body).toStrictEqual({});
  });

  it('error-wrong-password', async () => {
    const user = await UserFactory( );
    const response = await req
      .post(route)
      .set('Accept', 'application/json')
      .send({
        email: user.email,
        password: 'Aa@123456ddd'
      })
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe(ERRORS.INVALID_PASSWORD);
    expect(response.body.success).toBe(false);
    expect(response.body.body).toStrictEqual({});
  });

 

  it('login_successfully', async () => {
    const user = await UserFactory( );
    const response = await req
      .post(route)
      .set('Accept', 'application/json')
      .send({
        email: user.email,
        password: 'Aa@123456'
      })
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Operation Done Successfully');
    expect(response.body.body.token).toBeTruthy();
    expect(response.body.body.user.id.toString()).toBe(user.id.toString());
    expect(response.body.body.user.email).toBe(user.email);
    expect(response.body.body.user.createdAt).toBeTruthy();
    expect(response.body.body.user.updatedAt).toBeTruthy();

  });
});
