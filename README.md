# Wanted app
#### Description:
Wanted app makes it easier to create and share a search notice for a loved one who has disappeared. Amidst all the other entertaining content, this kind of post does not get much users attention on social media.
This application is dedicated to this kind of post so that anyone who wants to help can click on the link, see the information clearly, share it them selves and be aware of the progress of the situation.
#####  How it works:
The new user create an account with an email and a confirmed password, the registration needs to be verified by a code sent to the email address.
The email adress is also the unique user name.

The user has access to the feed screen where he can see all the posts of the app requested from the database.
By tapping on one post he goes to the Details screen with the photos of the missing person, his/her identity info, physical description and a button to call or send an email to the post creator (someone who knows the missing person, family, friend ...)

The creating post screen is accessible with the middle button of the bottom tab bar. In this screen the user can pick some pictures (minimum 1) from the camera roll, add the person's name, age, last seen location and date and other essential information needed to identify him/her. Some fields are required but not all of them. I wanted the form to be as simple as possible and not stressful. The form
##### Technical :
* Language : Java Script
* Framework : React Native
* Backend : AWS amplify
    * Authentication : Cognito
    * Data store : DynamoDB
    * API : GraphQL
* Platforms : Android / iOS

##### Functionalities :
* Creating account
* Validation code via email
* Login
* Forgot password
* Dynamic feed with request from the data base
* Image carousel, image picking
* Error message for the fields validation
* Multi-step form with tracking progress bar
* Dynamic sections for the post details.

##### Improvements :
Overall the project looks like what I wanted to do. Except creating an URL for each post in order to share it on social medias which i didn't manage to implement.
* Map view showing locations of all the missing notices around the current location.
* Comments below the posts for people to ask questions or provide support to the family with positive messages.
* Login with social media (twitter / facebook)
* Generating "posters" formatted in Wanted app which can be printed or shared in instagram, snapchat, facebook, whatsapp stories (with the link embedded)
* Private Live chat to contact the user
* Adapt the app to create also posts for missing (important) objects or animals.
Also But this experience was really enriching and i'm proud of it. Thanks for reading!

