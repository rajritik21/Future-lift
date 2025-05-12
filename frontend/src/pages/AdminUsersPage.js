import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import UserManagement from '../components/admin/UserManagement';

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  );
};

export default AdminUsersPage; 