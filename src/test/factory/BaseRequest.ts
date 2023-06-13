import request, { Test as ITest } from "supertest";
import { app } from "@infra/http/app";

export class BaseRequest {
  static post(url: string): ITest {
    return this.makeRequest().post(this.makeUrl(url));
  }

  static put(url: string): ITest {
    return this.makeRequest().put(this.makeUrl(url));
  }

  static delete(url: string): ITest {
    return this.makeRequest().delete(this.makeUrl(url));
  }

  static get(url: string): ITest {
    return this.makeRequest().get(this.makeUrl(url));
  }

  static makeUrl(url: string): string {
    return `/api/v1/${url}`;
  }

  static makeRequest() {
    return request(app);
  }
}
