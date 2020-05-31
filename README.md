# preacthsl2
 PWA accessibility user app makes queries from web browser into a local server where are my bustops and routes. And when by ex. a bus comes. It is using data by using own local gateway server, which redirect post queries into HSL, FINLAND or WALTTI system server. All query data is shown in below a query 'form'. It can also open timetable html page on HSL and FINLAND user html pages. And open pdf file contain timetables for a bus stop of a user made query. The application is coded also for visual impared people in the mind. The application can used by mouse, but also by screenreader, when a user pressing a tab. And selecting by ex. a link by enter key. Then a screen reader is reading app page logical text elements, like busstop header or route or its sub elments. 

The application is made by preact 10.4.4. The preact is a js react dialect, but smaller and quicker than react is. When (1) npm and node are installed on a (web) server, (2) install this repo on your server, (3) then install the app by command: 'npm install'. (4) Start a gateway server from a 'reacthslserver' directory by command: 'node server.js'. (5) The server app for a developer is started by 'npm run dev' command. (6) The deploy package is done by command: npm run build. (7) install and start the js application/server normally.

Config.js file contais by ex. a gateway address definition. And reacthslserver directory constains that gateway server made by node server. It is started by command: node server.js <enter>.
 
 Tuomas Kassila
