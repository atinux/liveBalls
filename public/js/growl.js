var container = $("<div />");
container.attr({id: "growl"});
$("body").append(container);

$.growl = function(body, type, type2){
  // a changer plus tard
  var msg = $("<div />");
  msg.addClass("msg");
  msg.html(body);

  container.append(msg);

  msg.show("drop", { direction: "down", distance: 50 }, 300)
    .delay(2000)
    .fadeOut(300, function(){
      $(this).remove();
    });

  return msg;
};
