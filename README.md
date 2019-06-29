### Simple Login Example Using NodeJS

Login example include vagrant box to Run Example, To install vagrant [See official Doc](https://www.vagrantup.com/downloads.html) you must install virtualBox first [See official Doc](https://www.virtualbox.org/wiki/Downloads).

Template Used in Login example Download from [colorlib.com](https://colorlib.com/wp/template/login-form-v3/)

To access application's source code under `application` folder

Login example's technologies stack: `NodeJS`, `ExpressJS`, `Pug(Template Engine)`, `NPM`, `Bower`.

##### To Run Example:

- load vagrant box with next command
```
cd /project-path && vagrant up
```
- Run node server for example
```
vagrant ssh
cd /home/vagrant/application && npm start
```

- open any browser with next path => http://192.168.45.2:3030/


##### Possible Routes

- Index route for login => http://192.168.45.2:3030/

- User's profile route => http://192.168.45.2:3030/user/:id

- Logout route => http://192.168.45.2:3030/logout


##### Notices:

- To access example code on vagrant box using SSH with next command
```
cd /project-path && vagrant ssh
cd /home/vagrant/application
```

- To Install example's packages dependencies[back-end and front-end packages] (when vagrant up at first time it install automatically)
```
cd /project-path && vagrant ssh
cd /home/vagrant/application
npm run loadAppDependencies
```
