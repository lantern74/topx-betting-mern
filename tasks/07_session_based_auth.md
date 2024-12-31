# Task 07: Implement Session-Based Authentication

## Objective
Convert the backend authentication system from JWT (JSON Web Token) to session-based authentication, storing session data in MongoDB. This will enhance security and allow for more granular control over user sessions, including the ability to revoke all sessions for a user if they are blocked.

## Detailed Requirements

### 1. Session Management
-   **Session Storage:** Implement session storage using MongoDB. Each session should store the user ID and any other relevant session data.
-   **Session Creation:** Upon successful login, create a new session record in MongoDB and return a session identifier (e.g., session ID) to the client, typically as a cookie.
-   **Session Validation:** On each request, validate the session identifier against the stored sessions in MongoDB. If the session is valid, proceed with the request; otherwise, return an authentication error.
-   **Session Expiration:** Implement session expiration to automatically remove inactive sessions after a specified time.
-   **Session Renewal:** Implement session renewal to extend the expiration time of a session when the user is active.

### 2. Revoke Sessions
-   **Revoke All Sessions:** Implement a function that allows an administrator to revoke all active sessions for a specific user. This function should remove all session records associated with the user from MongoDB.
-   **User Blocking:** When a user is blocked, all their active sessions should be revoked.

### 3. Security
-   **Secure Cookies:** Ensure that session identifiers are stored in HTTP-only cookies to prevent client-side JavaScript access.
-   **Session Hijacking Prevention:** Implement measures to prevent session hijacking, such as using secure cookies and regularly regenerating session IDs.

### 4. Code Quality
-   **Modular Design:** Organize the session management logic into a separate module or service.
-   **Error Handling:** Implement proper error handling for session creation, validation, and revocation.
-   **Logging:** Log session-related events, such as session creation, validation, and revocation.

### 5. Database Schema
-   **Session Collection:** Create a new MongoDB collection to store session data. The collection should include fields for session ID, user ID, creation time, expiration time, and any other relevant data.

## Relevant Files
The following files are likely to be modified or created:

-   `backend/models/session.model.js`: Model for the session data in MongoDB.
-   `backend/services/session.service.js`: Service for managing sessions (creation, validation, revocation).
-   `backend/middleware/authMiddleware.js`: Middleware for session validation.
-   `backend/controllers/admin.controller.js`: Controller for admin-related actions, including user blocking and session revocation.
-   `backend/routes/admin.routes.js`: Routes for admin-related actions.
-   `backend/index.js`: Entry point of the backend application, where session middleware will be configured.
-   `backend/models/admin.model.js`: To add a function to revoke all sessions for a user.
-   `frontend/src/hooks/useAdminLogin.js`: To handle the session cookie.
-   `frontend/src/hooks/useSubAdminLogin.js`: To handle the session cookie.
-   `frontend/src/utils/api.js`: To handle the session cookie.

## Implementation Steps
1.  **Database Setup:** Create the `sessions` collection in MongoDB.
2.  **Session Model:** Create the `backend/models/session.model.js` file to define the session schema.
3.  **Session Service:** Create the `backend/services/session.service.js` file to handle session creation, validation, and revocation.
4.  **Authentication Middleware:** Modify `backend/middleware/authMiddleware.js` to use session-based authentication.
5.  **Admin Controller:** Modify `backend/controllers/admin.controller.js` to include functionality for revoking all sessions for a user.
6.  **Admin Routes:** Modify `backend/routes/admin.routes.js` to include routes for revoking sessions.
7.  **Backend Entry Point:** Modify `backend/index.js` to configure session middleware.
8.  **Frontend Hooks:** Modify `frontend/src/hooks/useAdminLogin.js` and `frontend/src/hooks/useSubAdminLogin.js` to handle the session cookie.
9.  **API Utility:** Modify `frontend/src/utils/api.js` to handle the session cookie.
10. **Testing:** Thoroughly test the new authentication system, including session creation, validation, expiration, renewal, and revocation.

## Notes
-   Ensure that all sensitive data is handled securely.
-   Use environment variables for sensitive configuration data.
-   Implement proper logging and error handling.
-   Consider using a library for session management to simplify the implementation.
