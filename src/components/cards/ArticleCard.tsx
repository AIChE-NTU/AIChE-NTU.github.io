
import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import type { Article } from '../../constants';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <Card className="flex flex-col h-full min-h-[500px]">
    <Link to={`/articles/${article.id}`}>
      <img src={article.imageUrl} alt={article.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300" />
    </Link>
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {article.category}
        </span>
        <span className="text-xs text-text-muted">{article.readTime}</span>
      </div>
      <Link to={`/articles/${article.id}`}>
        <h3 className="text-2xl font-bold mb-4 text-text-main hover:text-primary transition-colors">{article.title}</h3>
      </Link>
      <p className="text-sm font-semibold text-text-muted mb-4">By {article.author} - {article.publicationDate}</p>
      <p className="text-text-muted flex-grow mb-6 text-lg leading-relaxed">{article.summary}</p>
      <Link to={`/articles/${article.id}`} className="mt-auto font-semibold text-primary hover:text-primary-focus transition-colors self-start text-lg">
        Read Full Article &rarr;
      </Link>
    </div>
  </Card>
);

export default ArticleCard;
