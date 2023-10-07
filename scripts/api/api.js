export class Api {
  constructor() {
    this.baseUrl = 'data/photographers.json'; // API baseURL
    // this.baseUrl = 'https://raw.githubusercontent.com/ManoaRas/P6-Fisheye/main/data/photographers.json'; // API baseURL
  }

  async get() {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      }
      let response = await fetch(this.baseUrl, { statusCode: 200, headers: headers, method: 'GET' });
      if (!response.ok) throw new Error(await response.status);
      return response.json();
    } catch(apiError) {
      throw new Error (`Failed to retrieve resources: ${apiError.message}`);
    }
  }
}
