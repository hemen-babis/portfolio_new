import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
const Home = lazy(() => import('./pages/Home.jsx'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectCase = lazy(() => import('./pages/ProjectCase.jsx'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'))
const AboutMePage = lazy(() => import('./pages/AboutMePage.jsx'))
const WorkPage = lazy(() => import('./pages/WorkPage.jsx'))
const HireMePage = lazy(() => import('./pages/HireMePage.jsx'))
const SuccessPage = lazy(() => import('./pages/SuccessPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div style={{padding:'2rem', textAlign:'center'}}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectCase />} />
          <Route path="/work" element={<Navigate to="/projects" replace />} />
          <Route path="/hire" element={<HireMePage />} />
          <Route path="/hemenly-tech" element={<HireMePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<Navigate to="/hemenly-tech" replace />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
