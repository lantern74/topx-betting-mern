# Member System Development

## Objective

This task focuses on building a system for managing members, including features for adding, blocking, and restricting access based on IP addresses.

## Features

1.  **Add Members:**
    -   Sub-admins or main admins can create new members.
    -   Required member details:
        -   Account (帳號): Username or unique identifier.
        -   Password (密碼): Secure password.
        -   Date (日期): Date of member creation.
        -   Price (價錢): Monetary value or associated amount (e.g., fees, credit balance).

2.  **Block Members (封鎖會員):**
    -   Implement functionality to block members.

3.  **IP Restrictions:**
    -   Members can only log in from a maximum of 3 unique IP addresses.
    -   Automatic account blocking if a member attempts to log in from more than 3 different IP addresses.

## Relevant Files

-   `frontend/src/components/form/Login.jsx`: Existing member login page.
-   `frontend/src/components/form/LoginForm.jsx`: Form component for the login page.
-   `backend/index.js`: Backend server entry point.

## Task Breakdown

Here's a detailed breakdown of the tasks for each file:

1.  **Database Schema:**
    -   [ ]  `backend/models/member.model.js`:
        -   [ ]  Review the existing schema.
        -   [ ]  Ensure it includes fields for `username`, `password`, `createdAt`, `price`, `blocked`, `ipAddresses`, and `createdBy`.
        -   [ ]  Confirm the `ipAddresses` field is an array of strings.
        -   [ ]  Confirm the `createdBy` field is a reference to the `Admin` model.

2.  **Backend Endpoints:**
    -   [ ]  `backend/routes/admin.routes.js`:
        -   [ ]  Ensure the `/admin/register-member` route is present and accessible by both main and sub admins.
        -   [ ]  Add a new route `/admin/members/:id/block` to handle blocking a member.
        -   [ ]  Add a new route `/admin/members/:id/unblock` to handle unblocking a member.
        -   [ ]  Ensure the `/admin/members` route is present and accessible by both main and sub admins.
    -   [ ]  `backend/controllers/admin.controller.js`:
        -   [ ]  Modify the `registerMember` function to handle the `createdBy` field.
        -   [ ]  Add a new function to handle blocking a member by ID.
        -   [ ]  Add a new function to handle unblocking a member by ID.
        -   [ ]  Ensure the `getAllMembers` function returns all members with the `createdBy` field populated.
    -   [ ] `backend/routes/member.routes.js`:
        -   [ ] Review the existing `/member/login` route.
    -   [ ] `backend/controllers/member.controller.js`:
        -   [ ]  Implement the logic for member login, including IP address tracking and blocking if more than 3 unique IPs are used.
        -   [ ]  Ensure that the login function checks if the member is blocked.
        -   [ ]  Implement logic to add the IP address to the `ipAddresses` array if it's not already present.
        -   [ ]  Implement logic to block the member if the number of unique IP addresses exceeds 3.
    -   [ ] `backend/index.js`:
        -   [ ]  Ensure all routes are correctly included.

3.  **Frontend Components:**
    -   [ ]  `frontend/src/components/form/Login.jsx`:
        -   [ ]  No changes needed for this task.
    -   [ ]  `frontend/src/components/form/LoginForm.jsx`:
        -   [ ]  No changes needed for this task.
    -   [ ]  `frontend/src/components/admin/ManageMembers.jsx`:
        -   [ ]  Ensure the component fetches and displays member data.
        -   [ ]  Implement the block/unblock functionality using the new backend endpoints.
        -   [ ]  Display a success/error message when blocking/unblocking a member.
    -   [ ]  `frontend/src/components/admin/MemberTable.jsx`:
        -   [ ]  Ensure the table displays member data correctly.
        -   [ ]  Implement the block/unblock buttons for each member.
    -   [ ] `frontend/src/hooks/useGetAllMembers.js`:
        -   [ ] Ensure the hook fetches all members.
    -   [ ] `frontend/src/utils/api.js`:
        -   [ ] Ensure the API calls are correctly set up.

4.  **Authentication and IP Tracking:**
    -   [ ]  `backend/middleware/authMiddleware.js`:
        -   [ ]  No changes needed for this task.
    -   [ ]  `frontend/src/store/authStore.js`:
        -   [ ]  No changes needed for this task.

## Additional Notes

-   Consider how to efficiently store and compare IP addresses.
-   Implement robust error handling for cases where a member is blocked due to IP restrictions.
-   Ensure the frontend clearly communicates the IP restriction policy to members.
