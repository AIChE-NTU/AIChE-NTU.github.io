
import React from 'react';
import Card from './Card';
import type { Article } from '../constants';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <Card className="flex flex-col">
    <a href={article.link} target="_blank" rel="noopener noreferrer">
      <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
    </a>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold mb-2 text-text-main">{article.title}</h3>
      <p className="text-sm font-semibold text-text-muted mb-3">By {article.author} - {article.publicationDate}</p>
      <p className="text-text-muted flex-grow mb-4">{article.summary}</p>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="mt-auto font-semibold text-primary hover:text-primary-focus transition-colors self-start">
        Read Full Article &rarr;
      </a>
    </div>
  </Card>
);

export default ArticleCard;
