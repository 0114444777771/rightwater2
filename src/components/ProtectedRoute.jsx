// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  // نعرض شاشة تحميل أثناء التحقق من حالة المستخدم
  if (loading) {
     return (
      <div className="flex justify-center items-center h-screen">
         <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
     );
  }

  // إذا لم يكن المستخدم مسجلاً، نوجهه لصفحة الدخول
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // إذا كانت الصفحة للمدير فقط والمستخدم الحالي ليس مديرًا، نوجهه للصفحة الرئيسية
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />; 
  }

  // إذا كان كل شيء على ما يرام، نعرض الصفحة المطلوبة
  return <Outlet />;
};

export default ProtectedRoute;
