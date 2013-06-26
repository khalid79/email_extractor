/* test background code --> ok
setInterval(function(){
	var d = new Date();
	chrome.browserAction.setBadgeText({'text': String(d.getMinutes())});
	},
	 3000
 );
*/

//////////////////////////// 	notification START test	--> ok ////////////////////////////////////////
// Note: There's no need to call webkitNotifications.checkPermission().
// Extensions that declare the notifications permission are always
// allowed create notifications.

// Create a simple text notification:
var notification = webkitNotifications.createNotification(
  'img/icon_48_48.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);

// Or create an HTML notification:
var notification = webkitNotifications.createHTMLNotification(
  'notification.html'  // html url - can be relative
);

// Then show the notification.
//notification.show();

//////////////////////////// 	notification END	////////////////////////////////////////