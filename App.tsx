
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/main/HomePage';
import AboutPage from './pages/main/AboutPage';
import ArticlesPage from './pages/main/ArticlesPage';
import CalendarPage from './pages/main/CalendarPage';
import ContactPage from './pages/main/ContactPage';
import JoinUsPage from './pages/main/JoinUsPage';
import ProjectsPage from './pages/activities/ProjectsPage';
import WorkshopsPage from './pages/activities/WorkshopsPage';
import ActivitiesPage from './pages/activities/ActivitiesPage';
import IndustryVisitsPage from './pages/activities/IndustryVisitsPage';
import CompetitionsPage from './pages/activities/CompetitionsPage';
import ProjectDetailPage from './pages/details/ProjectDetailPage';
import WorkshopDetailPage from './pages/details/WorkshopDetailPage';
import ActivityDetailPage from './pages/details/ActivityDetailPage';
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