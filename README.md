### React Native front end for bus times

Research and display bus times either offline or live.

Server side, user has set bus routes and stops preferences.
When live, timetables for preset user preference are updated onto the mobile device, then making it accessible at anytime, wether a connection is available or not.

The app connects to the Bus Times Server API to fetch bus timetables and store it on local storage.
When online, the app has the option to use live data received through server API requests and will fallback to use local data when connection is lost. 
