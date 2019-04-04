# api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Chats](#chats)
	- [Create chats](#create-chats)
	- [Delete chats](#delete-chats)
	- [Retrieve chats](#retrieve-chats)
	- [Update chats](#update-chats)
	
- [Comment](#comment)
	- [Create comment](#create-comment)
	- [Delete comment](#delete-comment)
	- [Retrieve comment](#retrieve-comment)
	- [Update comment](#update-comment)
	
- [Messages](#messages)
	- [Create messages](#create-messages)
	- [Delete messages](#delete-messages)
	- [Retrieve messages](#retrieve-messages)
	- [Update messages](#update-messages)
	
- [News](#news)
	- [Create news](#create-news)
	- [Delete news](#delete-news)
	- [Retrieve news](#retrieve-news)
	- [Update news](#update-news)
	
- [Notification](#notification)
	- [Create notification](#create-notification)
	- [Retrieve notifications](#retrieve-notifications)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Post](#post)
	- [](#)
	- [Create post](#create-post)
	- [](#)
	- [Delete post](#delete-post)
	- [Retrieve post](#retrieve-post)
	- [Retrieve posts](#retrieve-posts)
	- [Update post](#update-post)
	
- [Report](#report)
	- [Create report](#create-report)
	- [Delete report](#delete-report)
	- [Retrieve report](#retrieve-report)
	- [Retrieve reports](#retrieve-reports)
	- [Update report](#update-report)
	
- [User](#user)
	- [Add user badges](#add-user-badges)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Remove all tokens](#remove-all-tokens)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Save FCM token](#save-fcm-token)
	- [Update password](#update-password)
	- [Update user](#update-user)
	- [Update user avatar](#update-user-avatar)
	- [](#)
	- [](#)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

# Chats

## Create chats



	POST /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Chats's name.</p>							|
| picture			| 			|  <p>Chats's picture.</p>							|

## Delete chats



	DELETE /chats/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve chats



	GET /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update chats



	PUT /chats/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Chats's name.</p>							|
| picture			| 			|  <p>Chats's picture.</p>							|
| users			| 			|  <p>Chats's users.</p>							|
| lastmessage			| 			|  <p>Chats's lastmessage.</p>							|

# Comment

## Create comment



	POST /comments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| post_id			| 			|  <p>Comment's post_id.</p>							|
| body			| 			|  <p>Comment's body.</p>							|

## Delete comment



	DELETE /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve comment



	GET /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Update comment



	PUT /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| post_id			| 			|  <p>Comment's post_id.</p>							|
| body			| 			|  <p>Comment's body.</p>							|

# Messages

## Create messages



	POST /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| body			| 			|  <p>Messages's body.</p>							|
| attachments			| 			|  <p>Messages's attachments.</p>							|

## Delete messages



	DELETE /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve messages



	GET /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update messages



	PUT /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| body			| 			|  <p>Messages's body.</p>							|
| attachments			| 			|  <p>Messages's attachments.</p>							|

# News

## Create news



	POST /news


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| title			| String			|  <p>News's title.</p>							|
| body			| String			|  <p>News's body.</p>							|
| author_id			| String			|  <p>News's author_id.</p>							|
| preview			| String			|  <p>News's preview.</p>							|
| background			| String			|  <p>News's background.</p>							|
| type			| String			|  <p>News's type.</p>							|
| annotation			| String			|  <p>New`s annotation.</p>							|

## Delete news



	DELETE /news/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve news



	GET /news


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update news



	PUT /news/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| title			| 			|  <p>News's title.</p>							|
| body			| 			|  <p>News's body.</p>							|
| author_id			| 			|  <p>News's author_id.</p>							|
| preview			| 			|  <p>News's preview.</p>							|
| background			| 			|  <p>News's background.</p>							|
| type			| 			|  <p>News's type.</p>							|
| annotation			| 			|  <p>New`s annotation.</p>							|

# Notification

## Create notification



	POST /notifications


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| target			| String			|  <p>target user id</p>							|
| title			| 			|  <p>Notification's title.</p>							|
| body			| 			|  <p>Notification's body.</p>							|
| type			| 			|  <p>Notification's type.</p>							|
| picture			| 			|  <p>Notification's picture.</p>							|
| url			| 			|  <p>Notification's url.</p>							|

## Retrieve notifications



	GET /notifications


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Post

## 



	POST /posts/:id/user-list


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| status			| String			|  <p>user post status</p>							|

## Create post



	POST /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Post's name.</p>							|
| annotation			| String			|  <p>Post's annotation.</p>							|
| description			| String			|  <p>Post's description.</p>							|
| genre			| Object			|  <p>Post's genre.</p>							|
| type			| String			|  <p>Post's type.</p>							|
| rating			| String			|  <p>Post's rating.</p>							|
| status			| String			|  <p>Post's status.</p>							|
| date			| String			|  <p>Post's date.</p>							|
| author			| String			|  <p>Post's author.</p>							|
| cover			| String			|  <p>Post's cover.</p>							|
| chapters			| String			|  <p>Post's chapters.</p>							|
| pages			| String			|  <p>Post's pages.</p>							|
| reading			| String			|  <p>Post's reading.</p>							|
| episodes			| 			|  <p>Post's episodes.</p>							|
| ReadManga			| String			|  <p>URL</p>							|

## 



	DELETE /posts/:id/user-list


## Delete post



	DELETE /posts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve post



	GET /posts/:id


## Retrieve posts



	GET /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update post



	PUT /posts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Post's name.</p>							|
| annotation			| String			|  <p>Post's annotation.</p>							|
| description			| String			|  <p>Post's description.</p>							|
| genre			| 			|  <p>Post's genre.</p>							|
| type			| String			|  <p>Post's type.</p>							|
| rating			| String			|  <p>Post's rating.</p>							|
| status			| String			|  <p>Post's status.</p>							|
| date			| String			|  <p>Post's date.</p>							|
| author			| String			|  <p>Post's author.</p>							|
| cover			| String			|  <p>Post's cover.</p>							|
| chapters			| String			|  <p>Post's chapters.</p>							|
| pages			| String			|  <p>Post's pages.</p>							|
| reading			| String			|  <p>Post's reading.</p>							|
| episodes			| 			|  <p>Post's episodes.</p>							|

# Report

## Create report



	POST /reports


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Report's name.</p>							|
| body			| 			|  <p>Report's body.</p>							|
| post_id			| 			|  <p>Report's post_id.</p>							|
| user_id			| 			|  <p>Report's user_id.</p>							|
| authod_id			| 			|  <p>Report's authod_id.</p>							|
| status			| 			|  <p>Report's status.</p>							|

## Delete report



	DELETE /reports/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve report



	GET /reports/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve reports



	GET /reports


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update report



	PUT /reports/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Report's name.</p>							|
| body			| 			|  <p>Report's body.</p>							|
| post_id			| 			|  <p>Report's post_id.</p>							|
| user_id			| 			|  <p>Report's user_id.</p>							|
| authod_id			| 			|  <p>Report's authod_id.</p>							|
| status			| 			|  <p>Report's status.</p>							|

# User

## Add user badges



	POST /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| badges			| Array			|  <p>User badges</p>							|

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Remove all tokens



	DELETE /users/me/fcm


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Save FCM token



	PUT /users/me/fcm


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| desc			| String			| **optional** <p>User's description.</p>							|
| enablefcm			| Boolean			| **optional** <p>Enable notifications by FCM</p>							|

## Update user avatar



	POST /update/avatar


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| picture			| File			| **optional** <p>User's new avatar</p>							|

## 



	GET /users/offer


## 



	GET /users/recommendations



