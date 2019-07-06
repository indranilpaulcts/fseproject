# Task Manager

This the FSE Capsule Project for Cognizant, given by IIHT. I have used  **MongoDb - Express - Angular - NodeJS** combiation as this is a **MEAN** Stack FSE course.

## Getting Started

The project is divided in to two folders:

    1) ui -> Includes the Angular UI codes
    2) middleware -> Includes the backend API implemented using by NodeJS 

### Prerequisites

    Angular CLI: 8.0.4
    Node: 10.15.3
    MongoDB shell: v3.4.2

### Other Libraries
```
Angular:-
1) bootstrap: 4.3.1
2) font-awesome: 4.7.0

NodeJS:-
1) mongoose: 5.6.2
2) winston: 3.2.1
3) gulp: 4.0.2
4) nodemon: 1.19.1
```

### Installing

Clone thise repository and install required softwares. The dependencies will be installed using the **npm install** command. Then launch the UI & Middlware separately.

```
cd middleware
npm install
ng serve --open

cd ui
npm install
node server.js
```

Launch the mongod
```
cd C:\Program Files\MongoDB\Server\3.4\bin
mongod
```

## Log 

Two log files will be generated at middleware\logs\ folder

    1) app.log
    2) error.log

## Built With

* [Angular](https://angular.io/) - The UI framework used
* [Node](https://nodejs.org/en/) - The middleware
* [MongoDB](https://www.mongodb.com/) - Database


## Versioning

We use [GIT](https://github.com/) for versioning. For the versions available, see the [fseproject](https://github.com/indranilpaulcts/fseproject). 

## Authors

* **Indranil Paul** - *Development work* - [indranilpaulcts](https://github.com/indranilpaulcts)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* IIHT
* Cognizant
