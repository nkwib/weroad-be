import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AuthResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should login user', async () => {
    const data = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          login(loginUserInput: { username: "admin", password: "password" }) {
            token
          }
        }`,
      });
    expect(data.status).toBe(200);
    expect(data.body.data.login.token).toBeDefined();
  });

  it('should not login user with wrong password', async () => {
    const data = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          login(loginUserInput: { username: "admin", password: "wrongpassword" }) {
            token
          }
        }`,
      });
    expect(data.status).toBe(200);
    expect(data.body.data).toBeNull();
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('TravelResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get paginated travels', async () => {
    const data = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          getAllTravels(page: 0, limit: 10) {
            travels {
              id
              name
            }
          }
        }`,
      });
    expect(data.status).toBe(200);
    expect(data.body.data.getAllTravels.travels.length).toBe(10);
  });
});

describe('TourResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let jwtToken: string;

  beforeEach(async () => {
    const data = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          login(loginUserInput: { username: "admin", password: "password" }) {
            token
          }
        }`,
      });

    jwtToken = data.body.data.login.token;
  });

  it('should create a tour (admin only)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        query: `mutation {
          createTravel(createTravelData:{
             slug: "IT5235AI"
            name: "Name"
            img: "https://picsum.photos/200/300"
            description: "a description"
            numberOfDays: 12
            moods:{
              nature:30
              relax:100
              history:60
              culture:70
              party:90
            }
          }) {
            id
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createTravel.id).toBeDefined();
      });
  });
});
