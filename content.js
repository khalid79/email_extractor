
/////////////////// FROM ALL DOM ///////////////////////

function extractEmails(selectionText)
{
	var emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/igm;

	var emailsList = null;
    
    if (selectionText == null) 
    	emailsList = $('body').html().match(emailRegex) ;
    else
    	emailsList =  $('<div>'+selectionText+'<div>').html().match(emailRegex) ;
     
     return (emailsList == null)? emailsList:jQuery.unique(emailsList);

}


function extractPhoneNumbers(selectionText)
{	
	var phoneNumberRegex = /((08|0 8)[0-9]{2}([\ \.-][0-9]{3}){2})|(\+33|00\ 33)[\ \.-]?[\ ?[0-9]]?([\ \.-]?[0-9]{2}){4}|0[1-9]{1}(([0-9]{2}){4})|([0-9]{2}([\ \.-][0-9]{2}){4})/igm;
	
	var phonesList = null;

	if (selectionText == null) 
    	phonesList = $('body').html().match(phoneNumberRegex) ;
    else
    	phonesList =  $('<div>'+selectionText+'<div>').html().match(phoneNumberRegex) ;
     
     return (phonesList == null)? phonesList:jQuery.unique(phonesList);	
	
	
}

//////////////////////////////////////////////////////////


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	//responde to extract emailAddresses call
	if (request.method == "getEmails" ){
		var emails = extractEmails(null);
		console.log("extractEmails() : "+emails);
		if( emails != null && emails != ''){
			sendResponse({data: emails});			
		}else{
			sendResponse({data: null});	
		}
		
	}
	
	//responde to extract phoneNumber call
	else if (request.method == "getPhoneNumbers" ){
		var phones = extractPhoneNumbers(null);
		console.log("extractPhoneNumbers() : "+phones);
		if( phones != null && phones != ''){
			sendResponse({data: phones});			
		}else{
			sendResponse({data: null});	
		}
		
	}
	else if (request.method == "getSelection"){
		//sendResponse({data: window.getSelection().toString()});
		if(window.getSelection().toString() == ''){
  			sendResponse({data: ''}); // snub them.
		}else{
			var emailsFromSelection = extractEmails(window.getSelection().toString());
			var phonesFromSelection = extractPhoneNumbers(window.getSelection().toString());
			console.log("emailsFromSelection : "+emailsFromSelection);
			console.log("phonesFromSelection : "+phonesFromSelection);
				
			sendResponse({data: {emails: emailsFromSelection, phones: phonesFromSelection }});			
		
		}
		
	}
    

});
