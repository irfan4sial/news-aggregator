class TheGuardianAPIService {
  static async getArticles() {
    // const d = new Date();
    // const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    const res = await fetch(`https://content.guardianapis.com/search?q=&api-key=beaab55e-67f9-449e-9f45-75a0a14b13e9`);
    const data = await res.json();
    const { response } = data;
    return response.results.map((article, index) => ({
      id: index + 1,
      title: article.sectionName,
      description: article.webTitle,
      content: article.webTitle,
      category: 'content.guardianapis.com',
      publishedAt: article.webPublicationDate,
      source: 'The Guardian'
    }));
  }
}

export default TheGuardianAPIService;
