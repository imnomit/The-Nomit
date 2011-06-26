<?php foreach($posts as $post):?>
	
	<h1><a href="/blogs/view/<?=$post['Blog']['id']?>"><?=$post['Blog']['title']?></a></h1>
	<?=$post['Blog']['body']?>

<?php endforeach?>