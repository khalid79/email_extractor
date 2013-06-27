
function xinspect(o,i){
    if(typeof i=='undefined')i='';
    if(i.length>50)return '[MAX ITERATIONS]';
    var r=[];
    for(var p in o){
        var t=typeof o[p];
        r.push(i+'"'+p+'" ('+t+') => '+(t=='object' ? 'object:'+xinspect(o[p],i+'  ') : o[p]+''));
    }
    return r.join(i+'\n');
}

$(document).ready(function(){

    // copy source to website
    // sets click using jQuery
    $("#copyFromSourceToWebsite").click(function() {
		if($(this).attr('checked') == 'checked')
			$('#contactWebsite').val($('#source').val());
		else $('#contactWebsite').val('');		
	});

	// FIXME : Execute when the ationbrowser(icon) was clicked (not tab)
	chrome.tabs.getSelected(null, function(tab) {
    	
		console.log("chrome.tabs.getSelected");
		
		// fill source from  
    	$('#source').val(tab.url);

    	
		// call contentscript to get email addresses and fill email address field
		chrome.tabs.sendRequest(tab.id, {method: "getEmails"}, function (response) {
			
			console.log("chrome.tabs.sendRequest: getEmails");
			
			console.log("reponse emails :"+xinspect(response));
			
			if(response != null && response.data != null){

				emails = response.data;	
		  		$('#contactEmail').val(emails.join(','));
				chrome.browserAction.setBadgeText({'text': String(emails.length)});
			}else{
				$('#contactEmail').val("email not found");
				chrome.browserAction.setBadgeText({'text': '0'});
			}
			

		});

		// Call contentscript to get phone Numbers and fill phone number field
		chrome.tabs.sendRequest(tab.id, {method: "getPhoneNumbers"}, function (response) {
			
			console.log("chrome.tabs.sendRequest: getPhoneNumbers");
			
			console.log("reponse phones :"+xinspect(response));
			
			if(response != null && response.data != null){

				phones = response.data;	
		  		$('#contactPhoneNumber').val(phones.join(','));
			}else{
				$('#contactPhoneNumber').val("phone number not found");
			}
			

		});
	});

});
