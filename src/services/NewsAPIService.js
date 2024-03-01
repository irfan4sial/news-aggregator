class NewsAPIService {
  static async getArticles() {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=${date}&sortBy=publishedAt&apiKey=44d07f32ecd94e529881175d123e3281`);
    const data = await response.json();
    return data.articles.map((article, index) => ({
      id: index + 1,
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.source.name,
      publishedAt: article.publishedAt,
      source: 'News API'
    }));
  }
}

export default NewsAPIService;
