#Capstone Frontend

Deployed site: https://fsa-capstone-frontend-5a11747f8eba.herokuapp.com/login

- DONE: Create a new repository on Github and add all the team members.
- DONE: Create a new Vite react project and create components folder, in the folder add four .jsx files, Registration, Login, Single User, and Home.
- ~~For registration .jsx file where the user enters in a form their email, first name, last name, and password. Use redux tool kit to send the data to the backend and use windows.sessionstorage or localstorage to save the token.~~ Once the user is done, redirect to the home page.
- ~~For login .jsx file where the user enters their email and password into a form. Save the token used by redux tool kit and~~ redirect to the home page.
- Create a protected route for the home page. If there is no JSON web token, redirect to the login page. The home page should display a list of all the users. Each user should have two buttons by it, one for delete and one for update.
- The delete button should delete the user. You should not be able to delete the user that is signed in. Use tags so the file will update when you delete the user.
- Create an update page so when the user clicks on the update button, they go to a page that displays all that user’s information in a form. Then they can update that user's information. Once done, redirect to the home page.
- DONE: Deploy the front end.
