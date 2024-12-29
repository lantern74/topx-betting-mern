# Admin System Development

## Objective

This task involves building an admin system with two levels of administrators: Main Admins (大管理員) and Sub-Admins (小管理員). The system should allow for the creation and management of member accounts, with specific permissions for each admin type.

## Main Admin Capabilities

-   **Add Sub-Admins and Members:** Main admins should be able to create accounts for both sub-admins and members.
-   **Track Member Creation:** When viewing member information, the main admin should see which sub-admin added a particular member.

## Sub-Admin Capabilities

-   **Add Members:** Sub-admins should be able to create new member accounts.

## Relevant Files

-   `frontend/src/components/form/Login.jsx`: Existing member login page.
-   `frontend/src/components/form/LoginForm.jsx`: Form component for the login page.
-   `frontend/src/router/AppRouter.js`: Frontend routing configuration.
-   `backend/index.js`: Backend server entry point.

## Task Breakdown

1. **Database Schema:** Design a database schema to store admin and member information, including fields for tracking which admin created a member.
2. **Backend Endpoints:** Create backend endpoints (in `backend/index.js` or new files) to handle:
    -   Main admin creation.
    -   Sub-admin creation by main admins.
    -   Member creation by both main admins and sub-admins.
    -   Retrieving member information, including the creator admin.
3. **Frontend Components:** Develop frontend components (likely within `frontend/src/components/`) for:
    -   Main admin login.
    -   Sub-admin login.
    -   Forms for creating sub-admins and members.
    -   Displaying member information with the creator admin.
4. **Routing:** Update `frontend/src/router/AppRouter.js` to include routes for the new admin components.
5. **Authentication:** Implement authentication logic to differentiate between main admins and sub-admins, and restrict access to functionalities based on their roles.

## Additional Notes

-   Consider using a suitable database (e.g., MongoDB, PostgreSQL) for storing admin and member data.
-   Implement appropriate security measures for password storage and authentication.
-   Ensure the frontend components provide a clear and user-friendly interface for admin actions.
