
import React, { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import type { Article } from '../../../constants'
import { getDataUrl } from '../../../constants';
import ArticleCard from '../../cards/ArticleCard';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const [articlesRes, pagesRes] = await Promise.all([
          fetch(getDataUrl('articles.json')).then(res => res.json()),
          fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
        ]);
        setArticles(articlesRes);
        setPageConfig(pagesRes?.articles || null);
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">
          {pageConfig?.title || 'Articles & Publications'}
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          {pageConfig?.description || 'Read articles and publications from our student chapter members and faculty.'}
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
                {articles.map(article => (
                    <ArticleCard key={article.title} article={article} />
                ))}
            </div>
        ) : (
             <p className="text-center text-text-muted">
               {pageConfig?.emptyMessage || 'No articles to display at this moment.'}
             </p>
        )
      )}
    </div>
  );
};

export default ArticlesPage;

