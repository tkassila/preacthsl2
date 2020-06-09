# preacthsl2
Application purpose

PWA accessibility user app makes queries from web browser into a local server where are my bustops and routes. And when by ex. a bus comes. It is using data by using own local gateway server, which redirect post queries into HSL, FINLAND or WALTTI system server. All queried data are shown in below a current query 'form'. It can also open timetable html page on HSL and FINLAND user html pages. And open pdf file that may contain timetables for a bus stop of a user made query. 
 
The application is coded also for visual impared people in the mind. The application can used by mouse, but also by screenreader, when a user pressing a tab. And selecting by ex. a current link, button by enter key. Checkboxies are set on or off by pressing a space bar.  A screen reader is reading app page logical text elements, like busstop header or route or its sub elments by pressing a tab key.

Development

The application is made by preact 10.4.4 library. The preact is like a js react dialect, but smaller and quicker than react is. 

Installing

When (1) npm and node are installed on a (web) server, (2) install this repo on your server, (3) then install the app by command: 'npm install' on project repo root direcotry. (4) Start a gateway server, if don't have gateway part installed on web server. It is started from a 'reacthslserver' directory by command: 'node server.js'. (5) On another prompt, the server app for a developer is started by 'npm run dev' command.
If give command: 'npm start' enstead, then the starting app will use port 3000.

Deploy
(6) I have installed a next plugin: a) npm i -D preact-cli-plugin-async, b) create file: preact.config.js with next content: 

import asyncPlugin from 'preact-cli-plugin-async';

export default (config) => {
    asyncPlugin(config);
}

c) build prod. dir content: preact build --no-prerender

The deploy package is done by command: npm run build. More exact, see above.

(7) if you have deployed (6), then install and start the js application/server normally.

Config.js file contais by ex. a gateway address definition. And reacthslserver directory constains that gateway server made by node server. It is started by command: node server.js <enter>. If you may change Config.js file url or/and port,
then change also server.js file also.
 
Tuomas Kassila
