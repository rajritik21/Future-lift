# FutureLift Admin Panel Documentation

## Overview

The FutureLift Admin Panel is an integrated administrative interface for managing the job portal. It uses a consistent layout with a sidebar navigation and content area.

## Structure

### Pages
- `/admin/dashboard` - Main statistics and overview
- `/admin/jobs` - Job management (list, create, edit, delete)
- `/admin/internships` - Internship management
- `/admin/government-jobs` - Government job listings management
- `/admin/companies` - Company profile management
- `/admin/users` - User account management
- `/admin/categories` - Job categories management
- `/admin/access-codes` - Admin access code management
- `/admin/profile` - Admin profile management
- `/admin/settings` - Portal settings

### Components
The admin panel follows a structured approach:

1. **AdminLayout** - Base layout component with sidebar and header
2. **Page Components** - Each major section has its own page component (e.g., AdminJobsPage)
3. **Functional Components** - Specific functional components like forms and lists (e.g., JobList, JobForm)

## Implementation Notes

### Authentication & Authorization
- Admin routes are protected using the `PrivateRoute` component
- Access control is based on the `userType` field in the user object
- Only users with `userType: 'admin'` can access the admin panel

### Navigation
- Sidebar provides quick access to all admin features
- The sidebar can be collapsed for a better viewing experience
- The active menu item is highlighted for better UX

### Forms
- All forms include validation
- Forms provide a consistent UI for creating and editing resources
- Cancel/Back actions preserve user input

## Extended Permissions

The admin panel supports granular permissions through the `adminPermissions` object:

```js
{
  manageUsers: true,
  manageJobs: true,
  manageInternships: true,
  manageAdminCodes: true,
  manageSettings: true,
  viewAnalytics: true
}
```

The UI adapts to these permissions, showing only the options the admin user has access to.

## Future Enhancements

- [ ] Advanced analytics dashboard
- [ ] Export/import functionality for bulk operations
- [ ] Audit logging for admin actions
- [ ] Enhanced user management with filtering and searching
- [ ] Company verification process management 