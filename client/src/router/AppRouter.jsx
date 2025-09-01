import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner'
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProtectedRoutes } from "../ProtectedRoutes";
import { PublicRoutes } from "../PublicRoutes";
import { LinksPage } from "../pages/LinksPage";
import { LinkStatisticsPage } from "../pages/LinkStatisticsPage";
import { GeneralStatisticsPage } from "../pages/GeneralStatisticsPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRouter () {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Route>
        
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/links" element={<LinksPage />}/>
          <Route path="/links/:id" element={<LinkStatisticsPage />}/>
          <Route path="/statistics" element={<GeneralStatisticsPage />}/>
        </Route>

        <Route path="*" element={<NotFoundPage />}/>

      </Routes>
    </BrowserRouter>
  )
}