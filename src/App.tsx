
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './components/pages/main/HomePage';
import AboutPage from './components/pages/main/AboutPage';
import ArticlesPage from './components/pages/main/ArticlesPage';
import CalendarPage from './components/pages/main/CalendarPage';
import ContactPage from './components/pages/main/ContactPage';
import JoinUsPage from './components/pages/main/JoinUsPage';
import ProjectsPage from './components/pages/activities/ProjectsPage';
import WorkshopsPage from './components/pages/activities/WorkshopsPage';
import ActivitiesPage from './components/pages/activities/ActivitiesPage';
import IndustryVisitsPage from './components/pages/activities/IndustryVisitsPage';
import CompetitionsPage from './components/pages/activities/CompetitionsPage';
import ProjectDetailPage from './components/pages/details/ProjectDetailPage';
import WorkshopDetailPage from './components/pages/details/WorkshopDetailPage';
import ActivityDetailPage from './components/pages/details/ActivityDetailPage';
import ArticleDetailPage from './components/pages/details/ArticleDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/:id" element={<ArticleDetailPage />} />
            
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/tag/:tag" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<ProjectDetailPage />} />
            
            <Route path="workshops" element={<WorkshopsPage />} />
            <Route path="workshops/category/:category" element={<WorkshopsPage />} />
            <Route path="workshops/:workshopId" element={<WorkshopDetailPage />} />

            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/:activityId" element={<ActivityDetailPage />} />

            <Route path="industry-visits" element={<IndustryVisitsPage />} />
            <Route path="industry-visits/:activityId" element={<ActivityDetailPage />} />
            
            <Route path="competitions" element={<CompetitionsPage />} />
            <Route path="competitions/:activityId" element={<ActivityDetailPage />} />

            <Route path="calendar" element={<CalendarPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="join" element={<JoinUsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;