$(function(){

//Sistema de pesquisa
  var barraProgresso = 0;
  var isDrag = false;
  var precoMax = 70000;
  var precoAtual = 0;

  $('.pointer-barra').mousedown(function(){
      isDrag = true;
  });

  $(document).mouseup(function(){
    isDrag = false;
    enableTextSelection();
  });

  $('.barra-preco').mousemove(function(e){
      if(isDrag){
        disableTextSelection();
        var elBase = $(this);
        var mouseX = e.pageX - elBase.offset().left;
        if(mouseX < 0)
        mouseX = 0;
        if(mouseX > elBase.width())
        mouseX = elBase.width();

        barraProgresso = (mouseX / elBase.width()) * 100;  // Transformar valor da "page" em um percentual dentro de 100% 
        $('.barra-preco-fill').css('width',barraProgresso + '%');
        $('.pointer-barra').css('margin-left',barraProgresso + '%');


        precoAtual = (barraProgresso/100) * precoMax;
        precoAtual = formatarPreco(precoAtual);
        $('.preco_pesquisa').html('R$'+precoAtual);
      }
    })

    function formatarPreco(precoAtual){
        precoAtual = precoAtual.toFixed(2);
        precoArray = precoAtual.split('.');

        var novoPreco = formatarTotal(precoArray);
        return novoPreco;
    }

    function formatarTotal(precoArray){
        if(precoArray[0] < 1000){
            return precoArray[0]+','+precoArray[1];
    }else if(precoArray[0] < 10000){
        return precoArray[0][0]+'.'+precoArray[0].substr(1,precoArray[0].length)+
        ','+precoArray[1];
    }else {
        return precoArray[0][0]+precoArray[0][1]+'.'+precoArray[0].substr(2,precoArray[0].length)+
        ','+precoArray[1];
    }
}

  //Desabilitar seleção do texto
  function disableTextSelection(){
      $("body").css("-webkit-user-select","none");
      $("body").css("-moz-user-select","none");
      $("body").css("-ms-user-select","none");
      $("body").css("-o-user-select","none");
      $("body").css("user-select","none");     
  }

  //Habilitar seleção de texto
  function enableTextSelection(){
    $("body").css("-webkit-user-select","auto");
    $("body").css("-moz-user-select","auto");
    $("body").css("-ms-user-select","auto");
    $("body").css("-o-user-select","auto");
    $("body").css("user-select","auto");     
   }


});