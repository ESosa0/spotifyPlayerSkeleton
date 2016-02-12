$(function() {

  var SpotifyTrack = function() {
    this.name = null;
    this.artist = null;
    this.imageUrl = null;
    this.previewUrl = null;
  }

  SpotifyTrack.prototype.searchTrack = function (e) {

    e.preventDefault();
    var keyword = $('.keyword').val();
    $.get('https://api.spotify.com/v1/search?type=track&query=' + keyword, this.handleTrack.bind(this));
  }

  SpotifyTrack.prototype.handleTrack = function(response) {

    this.name = response.tracks.items[0].name;
    this.artist = response.tracks.items[0].artists[0].name;
    this.imageUrl = response.tracks.items[0].album.images[0].url;
    this.previewUrl = response.tracks.items[0].preview_url;

    $('.js-player').attr('src', this.previewUrl)
    $('.btn-play').removeClass('playing');
    
    this.displayTrack();  
  };

  SpotifyTrack.prototype.playTrack = function(){

    if ($('.btn-play').hasClass('playing')){
      $('.js-player').trigger('pause');

    } else {
      $('.js-player').trigger('play');
    }

      $('.btn-play').toggleClass('playing');
  }

  SpotifyTrack.prototype.displayTrack = function(){

    $('.title').text(this.name);
    $('.author').text(this.artist);
    $('#image').attr('src', this.imageUrl)
  }

  function printTime () {
    var current = $('.js-player').prop('currentTime');
    $('progress').attr('value', current);
}

  var myTrack = new SpotifyTrack();

  $('.search').on('click', myTrack.searchTrack.bind(myTrack));
  $('.btn-play').on('click', myTrack.playTrack.bind(myTrack));
  $('.js-player').on('timeupdate', printTime);

});
