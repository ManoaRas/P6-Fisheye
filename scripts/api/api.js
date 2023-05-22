export class Api {
  constructor() {
    this.baseUrl = '../data/photographers.json'; // API baseURL
  }

  async get() {
    try {
      let response = await fetch(this.baseUrl, { headers: { 'Content-Type': 'application/json' }, method: 'GET' });
      if (!response.ok) throw new Error(await response.status);
      return response.json();
    } catch(apiError) {
      throw new Error ('Failed to retrieve ressources', apiError);
    }
  }
}
