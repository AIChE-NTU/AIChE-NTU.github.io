import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon, TagIcon } from '../../Icons';
import type { Article } from '../../../constants';
import { getDataUrl } from '../../../constants';
import Spinner from '../../Spinner';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(getDataUrl('articles.json'));
        const articles: Article[] = await response.json();
        
        const foundArticle = articles.find(a => a.id === id);
        setArticle(foundArticle || null);
        
        // Get related articles (exclude current article)
        const related = articles.filter(a => a.id !== id).slice(0, 3);
        setRelatedArticles(related);
        
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4">Article Not Found</h1>
          <p className="text-text-muted mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/articles" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-focus transition-colors">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        // Handle bold headings
        return (
          <h3 key={index} className="text-xl font-bold text-text-main mt-8 mb-4">
            {paragraph.slice(2, -2)}
          </h3>
        );
      }
      return (
        <p key={index} className="text-text-muted leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        to="/articles" 
        className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors mb-8 group"
      >
        <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Back to Articles
      </Link>

      {/* Article Header */}
      <article className="bg-surface rounded-xl shadow-xl overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-8 md:p-16 lg:p-20">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-muted mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">{article.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>{article.publicationDate}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-primary" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Article Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-text-main mb-3">Summary</h2>
            <p className="text-text-muted leading-relaxed italic">
              {article.summary}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-xl max-w-none text-lg leading-relaxed">
            {formatContent(article.content)}
          </div>

          {/* Tags */}
          <div className="flex items-center flex-wrap gap-3 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <TagIcon className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-text-main mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link 
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.id}`}
                className="bg-surface rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={relatedArticle.imageUrl} 
                  alt={relatedArticle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-text-main mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-3 line-clamp-2">
                    {relatedArticle.summary}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span>{relatedArticle.author}</span>
                    <span>•</span>
                    <span>{relatedArticle.publicationDate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Share & Actions */}
      <div className="mt-12 text-center">
        <Link 
          to="/articles"
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-focus transition-colors font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          View All Articles
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
