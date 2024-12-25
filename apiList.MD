authRouter

- POST /signup
- POST /singnout
- POST /login

profileRouter

- GET /profile/vieew
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter

- GET /user/connections
- GET /request/received
- GET /feed -gets you the profile of other users on teh platform
