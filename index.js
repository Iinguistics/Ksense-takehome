$(document).ready(function () {
	$(function () {
		$.ajax({
			url: 'https://jsonplaceholder.typicode.com/users',
			data: {
				format: 'json',
			},
			error: function () {
				$('#error').html('An error has occurred');
			},
			dataType: 'jsonp',
			success: function (data) {
				jQuery.map(data, function (user) {
					var $name = user.name;
					var $email = user.email;
					var $website = user.website;
					var $id = user.id;

					$('table')
						.find('tbody')
						.append(
							$('<tr>')
								.append(
									$('<td>').text($name),
									$('<td>').text($email),
									$('<td>').text($website),
								)
								.attr('id', $id)
								.addClass('user')
								.prop('name', $name),
						);
				});
			},
			type: 'GET',
		});
		$('.posts-container').hide();
	});

	$('div.users-table').delegate('tr', 'click', function () {
		$('.posts').empty();
		$('.user-name').text(this.name + ' Posts:');
		$('.posts-container').show();

		var $userId = parseInt(this.id);
		$.ajax({
			url: 'https://jsonplaceholder.typicode.com/posts',
			data: {
				format: 'json',
			},
			error: function () {
				$('#error').html('An error has occurred');
			},
			dataType: 'jsonp',
			success: function (data) {
				jQuery.map(data, function (post) {
					if (post.userId === $userId) {
						var $title = post.title;
						var $body = post.body;

						$('.posts').append(
							$('<h3>').text('Title: ' + $title),
							$('<p>').text($body),
							$('<div>').addClass('divider'),
						);
					}
				});
			},
			type: 'GET',
		});
	});
});
