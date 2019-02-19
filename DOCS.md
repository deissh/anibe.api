# api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
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
	
- [User](#user)
	- [Add user badges](#add-user-badges)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	- [Update user avatar](#update-user-avatar)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

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

## Update user avatar



	POST /update/avatar


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| picture			| File			| **optional** <p>User's new avatar</p>							|


