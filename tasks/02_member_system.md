# Member System Development

## Objective

This task focuses on building a system for managing members, including features for adding, blocking, and restricting access based on IP addresses.

## Features

1. **Add Members:**
    -   Sub-admins or main admins can create new members.
    -   Required member details:
        -   Account (帳號): Username or unique identifier.
        -   Password (密碼): Secure password.
        -   Date (日期): Date of member creation.
        -   Price (價錢): Monetary value or associated amount (e.g., fees, credit balance).

2. **Block Members (封鎖會員):**
    -   Implement functionality to block members.

3. **IP Restrictions:**
    -   Members can only log in from a maximum of 3 unique IP addresses.
    -   Automatic account blocking if a member attempts to log in from more than 3 different IP addresses.

## Relevant Files

-   `frontend/src/components/form/Login.jsx`: Existing member login page.
-   `frontend/src/components/form/LoginForm.jsx`: Form component for the login page.
-   `backend/index.js`: Backend server entry point.

## Task Breakdown

1. **Database Schema:** Design or extend the database schema to store member information, including:
    -   Account, password, creation date, and price.
    -   A field to track blocked status.
    -   A mechanism to store and track unique IP addresses associated with each member.

2. **Backend Endpoints:** Create or modify backend endpoints to handle:
    -   Member creation with the specified details.
    -   Blocking and unblocking members.
    -   Retrieving member information.
    -   Validating login attempts against the allowed IP addresses.

3. **Frontend Components:** Develop or update frontend components to:
    -   Provide forms for adding members (if not already covered in the Admin System task).
    -   Display member information.
    -   Allow admins to block/unblock members.

4. **Authentication and IP Tracking:**
    -   Enhance the authentication logic to track IP addresses during login.
    -   Implement the restriction to 3 unique IP addresses and automatic blocking.

## Additional Notes

-   Consider how to efficiently store and compare IP addresses.
-   Implement robust error handling for cases where a member is blocked due to IP restrictions.
-   Ensure the frontend clearly communicates the IP restriction policy to members.
