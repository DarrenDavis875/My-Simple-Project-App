var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container');
  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }
  
​   var $pokemonList = $('.pokemon_list');
​
 
  /// corrected
  function addListItem(pokemon) {
    var $pokemonList = $('.pokemon_list');
    var $listItem = $('<li>');
    // data target NEEDS to be the same as the ID of your modal or the connection wont be made
    var $button = $(
      '<button type="button" class="btn   btn-list-group-item" data-toggle="modal" data-target="#pokemonModal">' +
      pokemon.name +
      "</button>"
    );
    $listItem.append($button);
    $pokemonList.append($listItem);
    $($button).on('click', (function () {
      showDetails(pokemon);
    }));
  }
​
​  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
​
          add(pokemon);
        });
​
      })
      .catch(function (error) {
        console.error(error);
      })
  }
​
​
​
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        // add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
      })
​
      .catch(function (e) {
        console.error(e);
      });
  }
​
​
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      //clear $modalContainer ** these need to match your selectors in the html file
      $(".modal-title").html("");
      $("#item-height").html("");
      $("#item-weight").html("");
      $("#pokemon-front").attr("src", "");
      showModal(item);
    });
  }
​
​
  //showModal content 
  function showModal(item) {
    console.log(item)
    // bootstrap is doing the heavy lifting for you on the modal, you just need to tell everything where to go.
​
    // set variables for your modal selectors
    var $nameElement = $("<h5>" + item.name + "</h5>");
    var $heightElement = $("<p>Height: " + item.height + "</p>");
    var $weightElement = $("<p>Weight: " + item.weight + "</p>");
​
​
    // put those vars into the modal
    $(".modal-title").html($nameElement);
    $("#item-height").html($heightElement);
    $("#item-weight").html($weightElement);
    $("#pokemon-front").attr("src", item.imageUrlFront);
    // //clear $modalContainer
    // $($modalContainer).text('');
    // $($modalContainer).addClass('is-visible');
​
​
    // // add a div and class to DOM
    // var modal = $('<div>');
    // modal.addClass('modal');
​
    // //add close button to modal
    // var closeButtonElement = $('<button>');
    // closeButtonElement.addClass('modal-close');
    // closeButtonElement.text('close');
    // $(closeButtonElement).on('click', hideModal);
​
    // //   add item name to modal
    // var nameElement = $('<h1>');
    // nameElement.text(item.name);
​
    // var imageElementFront = $('<img>');
    // $('#pokemon-front').attr('src', item.imageUrlFront);
​
    // var imageElementBack = $('<img>');
    // $("#pokemon-back").attr('src', item.imageUrlBack);
​
    // // add height to modal
    // var heightElement = $('<p>');
    // $('#item-height').attr(Height, item.height + 'm');
​
    // // add weight to modal
    // var weightElement = $('<p>');
    // $('#item-weight').attr(Weight, item.height + 'kg');
​
​
    // $(modal).append(closeButtonElement);
    // $(modal).append(imageElementFront);
    // $(modal).append(imageElementBack);
    // $(modal).append(heightElement);
    // $(modal).append(weightElement);
    // $($modalContainer).append(modal);
​
  }
​
​
  $($modalContainer).on('click', hideModal);
​
  $(window).keydown(function (e) {
    if (e.key === 'Escape' && $($modalContainer).addClass('is-visible')) {
      hideModal();
    }
  });
​
​
​
  // hides modal when close button, target, escape button is hit.
  function hideModal() {
    $($modalContainer).removeClass('is-visible');
  }
​
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});