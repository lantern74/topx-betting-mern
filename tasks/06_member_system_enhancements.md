# Task 6: Member System Enhancements and Refinements

## Objective

This task focuses on enhancing the existing member system with several key improvements, including setting Chinese as the default language, implementing an auto-suspend function for excessive IP logins, ensuring admins can track member creation, and improving overall code quality.

## Requirements

1.  **Default Language:**
    *   Set Chinese (`zh`) as the default language for the application. English (`en`) should remain as the fallback language.
    *   Ensure that the application loads with Chinese as the initial language.

2.  **Auto-Suspend Function:**
    *   Implement an auto-suspend function that automatically blocks a member's account if they log in from more than 3 unique IP addresses.
    *   This function should be triggered upon a failed login attempt due to exceeding the IP limit.
    *   Provide a clear error message to the user when their account is blocked due to this reason.

3.  **Track Member Creation:**
    *   Ensure that when an admin (main or sub) creates a member, the system records which admin created the member.
    *   When viewing member information, admins should be able to see the username of the admin who created the member.

4.  **Code Quality and Style:**
    *   **React Query:** Utilize React Query for data fetching and state management. Ensure all API calls are handled through React Query hooks.
    *   **Custom Hooks:** Store all custom hooks in a dedicated `frontend/src/hooks` directory.
    *   **Modular Components:** Organize components in a modular pattern, separating concerns and promoting reusability.
    *   **Translations:** Add all new text to the `frontend/public/locales/zh/translation.json` and `frontend/public/locales/en/translation.json` files.
    *   **Error Handling:** Implement beneficial error messages in the snackbar for user feedback.
    *   **Console Logging:** Add comprehensive console logging across the application for easier debugging. Ensure that these logs can be easily turned off in a production environment.

## Relevant Files

-   `frontend/src/i18n.js`: Configuration for i18n.
-   `frontend/src/components/form/LoginForm.jsx`: Login form component.
-   `frontend/src/components/admin/ManageMembers.jsx`: Component for managing members.
-   `frontend/src/components/admin/MemberTable.jsx`: Component for displaying members in a table.
-   `frontend/src/hooks/useGetAllMembers.js`: Custom hook for fetching members.
-   `frontend/src/hooks/useRegisterMember.js`: Custom hook for registering members.
-   `backend/controllers/member.controller.js`: Backend controller for member operations.
-   `backend/models/member.model.js`: Mongoose model for members.
-   `backend/routes/member.routes.js`: Routes for member-related endpoints.
-   `frontend/public/locales/zh/translation.json`: Chinese translation file.
    -   `frontend/public/locales/en/translation.json`: English translation file.

## Task Breakdown

1.  **Default Language Configuration:**
    *   Modify `frontend/src/i18n.js` to set the default language to `zh`.

2.  **Auto-Suspend Implementation:**
    *   Update `backend/controllers/member.controller.js` to implement the auto-suspend logic.
    *   Modify the login function to check the number of unique IP addresses and block the member if the limit is exceeded.
    *   Add a new error message to `frontend/public/locales/zh/translation.json` and `frontend/public/locales/en/translation.json` for blocked accounts.
    *   Update `frontend/src/components/form/LoginForm.jsx` to display the new error message in the snackbar.

3.  **Track Member Creation:**
    *   Modify `backend/models/member.model.js` to include a `createdBy` field that references the `Admin` model.
    *   Update `backend/controllers/admin.controller.js` to populate the `createdBy` field when creating a new member.
    *   Modify `frontend/src/components/admin/MemberTable.jsx` to display the username of the admin who created the member.
    *   Update `frontend/src/hooks/useGetAllMembers.js` to fetch the `createdBy` field.

4.  **Code Refinement:**
    *   Ensure all API calls are made using React Query hooks.
    *   Move all custom hooks to the `frontend/src/hooks` directory.
    *   Organize components into smaller, reusable modules.
    *   Add console logs for key actions and errors, and ensure they can be disabled in production.
    *   Add all new text to the translation files.

## Additional Notes

-   Ensure that all changes are thoroughly tested.
-   Pay attention to error handling and provide clear feedback to the user.
-   Maintain a consistent coding style throughout the application.
