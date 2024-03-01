class OpenNewsAPIService {
  static async getArticles() {
    const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=S2GJmuVmXVaUzmQ9y0vfAIsqHnBhTZsT`);
    const data = await res.json();
    const { response } = data;
    return response.docs.map((article, index) => ({
      id: index + 1,
      title: article.headline.main,
      description: article.lead_paragraph,
      content: article.snippet,
      category: article.source,
      publishedAt: article.pub_date,
      source: 'New York Times API'
    }));
  }
}

export default OpenNewsAPIService;
