# Multiple Login Pages Development

## Objective

This task involves creating three separate login pages for different user roles:

1. **Admin Login Page:** For main administrators.
2. **Sub-Admin Login Page:** For sub-administrators.
3. **Member Login Page:** For members (already implemented).

Each login page should have a unique URL and appropriate form fields.

## Relevant Files

- `frontend/src/components/form/Login.jsx`: Existing member login page.
- `frontend/src/components/form/LoginForm.jsx`: Form component for the login
  page.
- `frontend/src/router/AppRouter.js`: Frontend routing configuration.

## Task Breakdown

1. **Create Login Components:**
   - Create two new React components for the admin and sub-admin login pages
     (e.g., `AdminLogin.jsx`, `SubAdminLogin.jsx`) within
     `frontend/src/components/form/`.
   - These components should be similar to the existing `Login.jsx` but with
     appropriate titles and potentially different form fields if needed.

2. **Update LoginForm Component:**
   - Modify the `LoginForm.jsx` component to be reusable for all three login
     pages.
   - You might need to pass props to customize the form fields or validation
     logic based on the user role.

3. **Routing:**
   - Update `frontend/src/router/AppRouter.js` to include routes for the new
     login pages:
     - `/admin/login` for the admin login page.
     - `/subadmin/login` for the sub-admin login page.
     - `/member/login` (or the existing route) for the member login page.

4. **Backend Endpoints:**
   - Create or modify backend endpoints to handle authentication for each user
     role.
   - These endpoints should validate credentials against the appropriate user
     type in the database.

5. **Authentication Logic:**
   - Implement authentication logic to differentiate between admins, sub-admins,
     and members.
   - After successful login, redirect users to the appropriate dashboard or
     landing page based on their role.

## Additional Notes

- Ensure consistent styling and branding across all login pages.
- Implement appropriate security measures for password storage and
  authentication.
- Consider using a state management solution (e.g., Redux, Context API) to
  manage user authentication state globally.
- Thoroughly test the login functionality for each user role to ensure correct
  redirection and access control.
