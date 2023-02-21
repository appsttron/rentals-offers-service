import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';

describe('ConfigController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/configs')
      .send({ name: 'TEST_1', value: 'TEST_1' })
      .set('Accept', 'application/json')
      .set('API_KEY', process.env.API_KEY);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('TEST_1');
    expect(response.body.value).toEqual(['TEST_1']);
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/configs')
      .send({ name: 'TEST_2', value: 'TEST_2' })
      .set('Accept', 'application/json')
      .set('API_KEY', process.env.API_KEY);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('TEST_2');
    expect(response.body.value).toEqual(['TEST_2']);
  });

  it('/ (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/configs')
      .send({ name: 'TEST_1', value: 'TEST_1,TEST_3' })
      .set('Accept', 'application/json')
      .set('API_KEY', process.env.API_KEY);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('TEST_1');
    expect(response.body.value).toEqual(['TEST_1', 'TEST_3']);
  });

  it('/TEST_1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/configs/TEST_1')
      .set('Accept', 'application/json')
      .set('API_KEY', process.env.API_KEY);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('TEST_1');
    expect(response.body.value).toEqual(['TEST_1', 'TEST_3']);
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/configs')
      .set('Accept', 'application/json')
      .set('API_KEY', process.env.API_KEY);
    expect(response.status).toEqual(200);
    const testItems = response.body.filter((item) =>
      ['TEST_1', 'TEST_2'].includes(item.name)
    );
    expect(testItems.length).toBe(2);
  });

  it('/TEST_1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/configs/TEST_1')
      .set('API_KEY', process.env.API_KEY)
      .expect(200);
  });

  it('/TEST_2 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/configs/TEST_2')
      .set('API_KEY', process.env.API_KEY)
      .expect(200);
  });
});
