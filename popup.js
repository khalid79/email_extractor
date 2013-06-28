
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


    // to know if the user has selected a text
    var selectionCase = false;

	// FIXME : Execute when the ationbrowser(icon) was clicked (not tab)
	chrome.tabs.getSelected(null, function(tab) {

		console.log("chrome.tabs.getSelected");
		
		chrome.browserAction.setBadgeText({'text': "..."});

		// fill source from  
    	$('#source').val(tab.url);

		//get selection from content_script
		chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
				
				console.log("chrome.tabs.sendRequest: getSelection");
				
				if(response != null && response.data != ''){
				  		
				  	selectionCase = true;

			  		var emailsFromSelection = response.data.emails;	
			  		var phonesFromSelection = response.data.phones;	

			  		if(emailsFromSelection != '' || phonesFromSelection != '' ){
			  			
						if(emailsFromSelection != null && emailsFromSelection != ''){
							$('#contactEmail').val(emailsFromSelection.join(','));
							chrome.browserAction.setBadgeText({'text': String(emailsFromSelection.length)});
							if(emailsFromSelection.length>0)
								chrome.browserAction.setBadgeBackgroundColor({color: "#32cd32"});
						}else{
							$('#contactEmail').val("email not found");
							chrome.browserAction.setBadgeText({'text': '0'});
						}

						if(phonesFromSelection != null && phonesFromSelection != ''){
					  		$('#contactPhoneNumber').val(phonesFromSelection.join(','));
						}else{
							$('#contactPhoneNumber').val("phone number not found");
						}

					}	
		  		
			  		
				}

			});

		// wait some seconte to receive the getSelection respose from content_script
		setTimeout(function() {

			console.log("reponse getSelection extern :"+selectionCase);
    		
    		//
	    	if (selectionCase == false ){
	    		// call contentscript to get email addresses and fill email address field
				chrome.tabs.sendRequest(tab.id, {method: "getEmails"}, function (response) {
					
					console.log("chrome.tabs.sendRequest: getEmails");
					
					console.log("reponse emails :"+xinspect(response));
					
					if(response != null && response.data != null){

						emails = response.data;	
				  		$('#contactEmail').val(emails.join(','));
						chrome.browserAction.setBadgeText({'text': String(emails.length)});
						if(emails.length>0)
							chrome.browserAction.setBadgeBackgroundColor({color: "#32cd32"});
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
	    	
	    	}


		},750);


    	
		
	});

});
