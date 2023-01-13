import { Component, OnInit } from '@angular/core';
declare var $: any; // para jquery
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery(function ( $ ) {
      $('.sidebar-dropdown > a').click(function() {
    $('.sidebar-submenu').slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass('active')
    ) {
      $('.sidebar-dropdown').removeClass('active');
      $(this)
        .parent()
        .removeClass('active');
    } else {
      $('.sidebar-dropdown').removeClass('active');
      $(this)
        .next('.sidebar-submenu')
        .slideDown(200);
      $(this)
        .parent()
        .addClass('active');
    }
  });
  $('#close-sidebar').click(function() {
    $('.page-wrapper').removeClass('toggled');
  });
  $('#show-sidebar').click(function() {
    $('.page-wrapper').addClass('toggled');
  });
  });
  }

}
