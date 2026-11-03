import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import RouteFallback from '@/components/RouteFallback'

const Home = lazy(() => import('@/pages/Home'))
const Services = lazy(() => import('@/pages/Services'))
const ServiceCategory = lazy(() => import('@/pages/ServiceCategory'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Industries = lazy(() => import('@/pages/Industries'))
const IndustryDetail = lazy(() => import('@/pages/IndustryDetail'))
const About = lazy(() => import('@/pages/About'))
const Locations = lazy(() => import('@/pages/Locations'))
const Insights = lazy(() => import('@/pages/Insights'))
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'))
const CaseStudies = lazy(() => import('@/pages/CaseStudies'))
const Tools = lazy(() => import('@/pages/Tools'))
const ToolDetail = lazy(() => import('@/pages/ToolDetail'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const Portal = lazy(() => import('@/pages/Portal'))
const Legal = lazy(() => import('@/pages/Legal'))
const Sitemap = lazy(() => import('@/pages/Sitemap'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:categorySlug" element={<ServiceCategory />} />
        <Route path="services/:categorySlug/:serviceSlug" element={<ServiceDetail />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryDetail />} />
        <Route path="about" element={<About />} />
        <Route path="locations" element={<Locations />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<ArticleDetail />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="tools" element={<Tools />} />
        <Route path="tools/:slug" element={<ToolDetail />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book" element={<Navigate to="/contact#book" replace />} />
        <Route path="portal" element={<Portal />} />
        <Route path="legal/:slug" element={<Legal />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export { Suspense, RouteFallback }
