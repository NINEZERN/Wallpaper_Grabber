
var originalTag = document.querySelector('#SubscribeItemBtn'); // Replace 'span' with the tag you want to replace
var newTag = document.createElement('a'); // Replace 'div' with the new tag you want to replace it with
newTag.innerText = 'Download';
newTag.href = "wpgrabber://" + window.location.href;
newTag.id = "Nine";
newTag.target = '_blank';
newTag.className = 'btn_green_white_innerfade btn_border_2px btn_medium';
newTag.style.padding = '10px';
originalTag.parentNode.replaceChild(newTag, originalTag);

    

  

