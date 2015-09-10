var token = "";

$(document).ready(function(){
	$("#call").click(function(event){
		$.ajax({
		    url: '/api/events',
		    method: 'GET',
		    dataType: "text",
		    headers: {
		    	'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWE3MWFjZjZkZTM1ZjZkMTU5YjA3YmEiLCJpYXQiOjE0Mzg4OTA2ODB9._BZ7V30d-gOiW5o4tq3NIEfHoBZCJQAgzMp7b6mWOXs'
		    },
		    success: function(data) { $("p.return").text(data); }
		});
	});

	// $("#login").click(function(event){
	// 	var email = $("#email").val();
	// 	var password = $("#password").val();
	// 	var obj = {
	// 		email:email,
	// 		password: password
	// 	};
	// 	console.log(obj);
	// 	$.post("/auth/local", obj, function(data, status){
	// 		console.log(data);
	// 		token = data.token;
	// 		window.location.replace("/")
	// 		console.log(status);
	// 	});
	// });
	// 
	$("#login-form").submit(function(e) {
		e.preventDefault();
		var formIns = $("#login-form > *");
		var email = $(formIns[0]).val()
		var password =$(formIns[1]).val()
    $.ajax({
     type: "POST",
      url: "/auth/local",
      data: {email: email, password:password},
      success: function(data) {
        console.log('success:' + data.token);
        token = data.token;
        document.cookie="token="+token;
        window.location = "/admin";
       }
    })

  });

	$("button").on("click", function(){
		console.log('clicked');
		var type = $(this).attr("type");
		var item_id = $(this).attr("item_id");
		if(!token){
			token = document.cookie;
			console.log(token);
			token = token.slice(token.indexOf('token=') + 6);
			console.log(token);
			if(token.indexOf(';') > -1){
				token = token.slice(0, token.indexOf(';'));
			}
		}
		var head = {
					'Authorization': 'Bearer ' + token
				};
		if ($(this).attr("value") == "edit"){
			window.location = "/admin/edit";
			return;
		}
		else {
			console.log(head);
			if (confirm('are you sure')){
				console.log('true');
				$.ajax({
					type:"DELETE",
					url: '/api/' + type + '/delete',
					headers: head,
					data: {item: item_id},
					success: function(){
						console.log('deleted');
						location.reload();
					}
				})
				//TODO: add calls
			}
		}
	})
});
