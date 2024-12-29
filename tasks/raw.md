Redhat, [12/28/24 8:38 PM]
1. Admin System
Main Admin (大管理員)
There are 2 main administrators who have the following abilities:
Add Sub-Admins and Members:
Main admins can create sub-admin accounts and member accounts.
Track Member Creation:
When viewing member information, the main admin can see which sub-admin added a particular member.
Sub-Admin (小管理員)
Sub-admins have limited permissions compared to main admins:
Add Members:
Sub-admins can create new member accounts.
2. Member System
Features for Managing Members:
Add Members:

Sub-admins or main admins can create new members with the following details:
Account (帳號): The username or unique identifier for the member.
Password (密碼): A secure password for the member account.
Date (日期): The date when the member was added.
Price (價錢): The monetary value or associated amount for the member (this could refer to fees or credit balance for betting).
Block Members (封鎖會員):

Members can be blocked if needed. This could be due to policy violations or other reasons.
IP Restrictions:

Members can only log in from 3 unique IP addresses:
If a member tries to log in from more than 3 different IP addresses, their account will be automatically blocked.
This is a security measure to prevent account sharing or unauthorized access.

Redhat, [12/28/24 8:38 PM]
3. Match/Event System
Automated Match/Event Management:
Auto Add Matches (自動新增賽事):

The system should automatically add new betting matches/events to the platform. This could involve fetching data from external APIs or pre-defined schedules.
Auto Delete Matches (自動刪除賽事):

The system should automatically delete matches/events that have been completed for over 24 hours:
This helps keep the system clean and prevents clutter with outdated matches.
Deletion might also include associated data, such as bets placed on those matches.

Redhat, [12/28/24 9:24 PM]
there is login page for now

Redhat, [12/28/24 9:25 PM]
it's member login page

Redhat, [12/28/24 9:26 PM]
we need to make 3 login page(admin login page, sub admin login page, member login page), member login page is made already

Redhat, [12/28/24 9:26 PM]
it's form is similar but url is different, for example, .../admin/login, .../subadmin/login, .../member/login
