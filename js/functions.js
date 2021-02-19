$(function(){

//Sistema de pesquisa pagina de venda
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

   ///////////////////////////////////////////////////////////////////////////////


  

    //MENU MOBILE todas as paginas
    $('.mobile').click(function(){
        $(this).find('ul').slideToggle();        
    });


    //MEXER SLIDE VEICULO TESTE
    var imgShow = 3;
    var minIndex = imgShow -1;
    var maIndex = Math.ceil($('.mini-img-wraper').length/3) -1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();

    function initSlider() {
        var amt = $('.mini-img-wraper').length * 33.3;
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-img-wraper');
        elScroll.css('width',amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');
    }

    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if(curIndex < maIndex){
                curIndex++;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }
        });
    }

    function clickSlider(){
        $('.mini-img-wraper').click(function(){
            $('.mini-img-wraper').css('background-color','transparent');
            $(this).css('background-color','rgb(204, 204, 204)');
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        });
        
        $('.mini-img-wraper').eq(0).click();
    };

    // CLICAR NO MENU EM CONTATO E IR PARA O FORMULARIO DE CONTATO NA MESMA PAGE

    /*var diretory ='/Curso de WebMaster/PROJETO 05/'


    $('[goto=contato]').click(function(){
        location.href=diretory+'index.html?contato';
        return false;
    })

    checkUrl();

    function checkUrl(){
        var url = location.href.split('/');
        var curPage = url[url.length-1].split('?');

        if(curPage[1] != undefined && curPage[1] == 'contato'){
        $('nav a').css('colo','black');
        $('footer nav a').css('color','white');
        $(this).css('color','#EB2D2D');
        $('html,body').animate({'scrollTop':$('#contato').offset().top});
        }
    }*/

    $('[goto=contato]').click(function(){
        $('nav a').css('colo','black');
        $('footer nav a').css('color','white');
        $(this).css('color','black');
        $('html,body').animate({'scrollTop':$('#contato').offset().top});
        return false;
    })

    // DEPOIMENTOS PAGE INDEX

    var amtDepoimento = $('.depoi-2').length;
    var indexDepoi = 0;

    inicDepoi();
    navDepoi();

    function inicDepoi(){
        $('.depoi-2').hide();
        $('.depoi-2').eq(0).show();
    }
  
    function navDepoi(){
        $('[next]').click(function(){
            indexDepoi++;
            if(indexDepoi >= amtDepoimento)
                indexDepoi = 0;
            $('.depoi-2').hide();
            $('.depoi-2').eq(indexDepoi).show();
        });

        $('[prev]').click(function(){
            indexDepoi--;
            if(indexDepoi < 0)
            indexDepoi = amtDepoimento-1;
            $('.depoi-2').hide();
            $('.depoi-2').eq(indexDepoi).show();
        })
    }

    $('.galeria').slick({
        slidesToShow: 3,
        centerMode: false,
         infinite: false,
         arrows: false,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false
                    }        
            }
        ]
    });

    

});