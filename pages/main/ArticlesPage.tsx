
import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import type { Article } from '../../constants';
import ArticleCard from '../../components/ArticleCard';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/articles.json');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Articles & Publications</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Read articles and publications from our student chapter members and faculty.
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                    <ArticleCard key={article.title} article={article} />
                ))}
            </div>
        ) : (
             <p className="text-center text-text-muted">No articles to display at this moment.</p>
        )
      )}
    </div>
  );
};

export default ArticlesPage;