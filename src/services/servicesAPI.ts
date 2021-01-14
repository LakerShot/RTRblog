export default class {
  baseUrl = 'https://conduit.productionready.io/api/';

  async fetching(path: string, token: string | null = null): Promise<any> {
    const auth: any = token && { Authorization: `Token ${token}` };
    const res: Response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: { ...auth },
    });
    if (!res.ok) throw new Error(`Fetching error ${res.status}`);
    return res.json();
  }

  async sendingRequestData(url: string, data: object): Promise<any> {
    const res: Response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Sending error ${res.status}`);
    return res.json();
  }

  async changeRequest(data: object | null, token: string, method: string, url: string): Promise<any> {
    const res: Response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Changing error ${res.status}`);
    return res.json();
  }

  async getRequestArticles(offset = 0, token: string | null): Promise<any> {
    return this.fetching(`articles?offset=${offset}&limit=10`, token);
  }

  async getRequestSingleArticle(slug: string, token: string | null): Promise<any> {
    return this.fetching(`articles/${slug}`, token);
  }

  async registration(data: object): Promise<any> {
    return this.sendingRequestData('users', data);
  }

  async login(data: object): Promise<any> {
    return this.sendingRequestData('users/login', data);
  }

  async changeProfile(data: object, token: string): Promise<any> {
    return this.changeRequest(data, token, 'PUT', 'user');
  }
}
