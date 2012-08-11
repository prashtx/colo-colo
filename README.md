Colo Colo
=========

An [Egg Hatcher](https://github.com/prashtx/egg-hatcher) client that uses
[Growl](http://growl.info/) to notify you of GitHub commits.

### Egg Hatcher

Egg Hatcher is a simple server that receives egg payloads from [Flying
Chicken](https://github.com/codeforamerica/flying_chicken) and sends messages
to websocket clients. It runs on nodester at egg-hatcher.nodester.com, since
nodester supports websockets.

## Usage

Install dependencies with

    $ npm install

Then run with

    $ node app.js &

## Q + A

**Shouldn't this be a daemon, a proper OS X app, or something like that?**  
Yup. That's probably a good next step.

**Colo Colo?**  
A creature with some chicken-like attributes, and some potential to growl (although
apparently it cries more than growls). From [Wikipedia][]: "if Colo Colo is not killed,
it will murder its victim."

[wikipedia]: http://en.wikipedia.org/wiki/Colo_Colo_(mythology)
