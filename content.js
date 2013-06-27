
function extractEmails()
{
	var emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/igm;
    return jQuery.unique( $('body').html().match(emailRegex) );
}

function extractPhoneNumbers()
{	
	
	var phoneNumberRegex = /((08|0 8)[0-9]{2}([\ \.-][0-9]{3}){2})|(\+33|00\ 33)[\ \.-]?[\ ?[0-9]]?([\ \.-]?[0-9]{2}){4}|0[1-9]{1}(([0-9]{2}){4})|([0-9]{2}([\ \.-][0-9]{2}){4})/igm;
	return jQuery.unique( $('body').html().match(phoneNumberRegex));
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	//responde to extract emailAddresses call
	if (request.method == "getEmails" ){
		var emails = extractEmails();
		console.log("extractEmails() : "+emails);
		if( emails != null && emails != ''){
			sendResponse({data: emails});			
		}else{
			sendResponse({data: null});	
		}
		
	}
	
	//responde to extract phoneNumber call
	if (request.method == "getPhoneNumbers" ){
		var phones = extractPhoneNumbers();
		console.log("extractPhoneNumbers() : "+phones);
		if( phones != null && phones != ''){
			sendResponse({data: phones});			
		}else{
			sendResponse({data: null});	
		}
		
	}

});
