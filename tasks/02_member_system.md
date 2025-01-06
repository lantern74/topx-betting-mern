# Member System Development

## Objective

This task involves implementing a system for managing members, including
registration, login, blocking, and IP restrictions.

## Features

1. **Admin System**
   - **Main Admin (大管理員)**
     - There are 2 main administrators who have the following abilities:
       - **Add Sub-Admins and Members:** Main admins can create sub-admin
         accounts and member accounts.
       - **Track Member Creation:** When viewing member information, the main
         admin can see which sub-admin added a particular member.
   - **Sub-Admin (小管理員)**
     - Sub-admins have limited permissions compared to main admins:
       - **Add Members:** Sub-admins can create new member accounts.
2. **Member System**
   - **Features for Managing Members:**
     - **Add Members:**
       - Sub-admins or main admins can create new members with the following
         details:
         - Account (帳號): The username or unique identifier for the member.
         - Password (密碼): A secure password for the member account.
         - Date (日期): The date when the member was added.
         - Price (價錢): The monetary value or associated amount for the member
           (this could refer to fees or credit balance for betting).
     - **Block Members (封鎖會員):**
       - Members can be blocked if needed. This could be due to policy
         violations or other reasons.
     - **IP Restrictions:**
       - Members can only log in from 3 unique IP addresses:
         - If a member tries to log in from more than 3 different IP addresses,
           their account will be automatically blocked.
         - This is a security measure to prevent account sharing or unauthorized
           access.
3. **Login Pages**
   - There are 3 login pages:
     - Admin login page (`/admin/login`)
     - Sub-admin login page (`/subadmin/login`)
     - Member login page (`/login`)

## Implementation Status

### Admin System

- [x] Main admins can add sub-admins.
- [x] Main admins can view all sub-admins.
- [x] Main admins can edit sub-admins.
- [x] Main admins can delete sub-admins.
- [x] Sub-admins can be created with a username and password.
- [x] Sub-admins can log in.
- [x] Main admins can add members.
- [x] Sub-admins can add members.
- [x] Main admins can view all members.
- [x] Sub-admins can view all members.
- [x] Main admins can track which sub-admin created a member.
- [x] Main admins can block members.
- [x] Sub-admins can block members.
- [x] Main admins can unblock members.
- [x] Sub-admins can unblock members.
- [x] Main admins can edit member price.
- [x] Sub-admins can edit member price.
- [x] Main admins can edit member credentials.
- [x] Sub-admins can edit member credentials.
- [x] Main admins can delete members.
- [x] Sub-admins can delete members.

### Member System

- [x] Members can register with a username and password.
- [x] Members can log in.
- [x] Members can be blocked.
- [x] Members are restricted to 3 IP addresses.
- [x] Members are automatically blocked after exceeding 3 IP addresses.
- [x] Members can be unblocked.
- [x] Members can have a price associated with them.

### Login Pages

- [x] Admin login page is implemented.
- [x] Sub-admin login page is implemented.
- [x] Member login page is implemented.

## Remaining Tasks

- None. All tasks for the member system are complete.
