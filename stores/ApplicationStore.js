'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = {
      home: {
        text: 'Home',
        route: 'home'
      },
      single: {
        text: 'Single',
        route: 'single'
      }
    };
  },
  handleNavigate: function(route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];
    if (pageName === this.getCurrentPageName()) {
      return;
    }
    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emit('change');
  },
  getCurrentPageName: function() {
    return this.currentPageName;
  },
  getState: function() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
  }
});

module.exports = ApplicationStore;