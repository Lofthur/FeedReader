/*  The code in this file makes tests to the app.js with the Jasmine testdriven framework.
    I wrote this code as part of a project from Udacity.
    Stein-T Dale 18.02.2016
*/

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        var arrLength = allFeeds.length;

        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Function checks each allFeed elements url property.
        //An it is created for each element and you can therfore see which
        //fall thru the test.
         function testInitialFeedURL(elementNumber) {
            it("should check if allFeeds element " + elementNumber + " has a URL and that it's length is not 0, and that it has a valid format", function() {
                expect(allFeeds[elementNumber].url).toBeDefined();
                expect(allFeeds[elementNumber].url.length).not.toBe(0);
                expect(allFeeds[elementNumber].url).toMatch(/^http(s?)\:\/\//);
            });
         }

        //Function checks each allFeed elements name property.
        //An it is created for each element and you can therfore see which
        //fall thru the test.
         function testInitialFeedName(elementNumber) {
            it("should check if allFeeds element " + elementNumber + " has a name and that it's length is not 0", function() {
                expect(allFeeds[elementNumber].name).toBeDefined();
                expect(allFeeds[elementNumber].name.length).not.toBe(0);
            });
         }

         //Call testInitialFeedURL and testInitialFeedName
         //for each allFeed element
         for(var i = 0; i < arrLength; i++) {
            testInitialFeedURL(i);
            testInitialFeedName(i);
         }
    });

    describe('The menu', function() {

        var bodyElement = $('body');
        var menuButton = $('.menu-icon-link');

         //The menu-hidden class gets toggeled on and of. When it's
         //on the body element the menu bar is hidden.
         it('menu element is hidden by default', function() {
             expect(bodyElement.hasClass('menu-hidden')).toEqual(true);
         });

          //Checks if the class menu-hidden is toggled off afer the
          //menu button has been clicked.
          it('menu item should be displayed when icon is clicked, and hidden when clicked again', function() {
                menuButton.trigger('click');
                expect(bodyElement.hasClass('menu-hidden')).toBe(false);
                menuButton.trigger('click');
                expect(bodyElement.hasClass('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function() {

         var container = $('.feed');

         beforeEach(function(done) {
            loadFeed(0, done);
         });
         //Checks to see that the feed's children element has a length
         //greater than zero.
         it('feed should have at least one entry element', function(done) {
            expect(container.children.length).toBeGreaterThan(0);
             done();
         });
    });

    describe('New Feed Selection', function() {

         var headerTitle;
         var feedTitle;

         beforeEach(function(done) {
            loadFeed(0, function() {
                //Store string values from the first feed.
                //And calls loadFeed again to get new values to
                //compare up against.
                headerTitle = $('.header-title').html();
                feedTitle = $('.feed .entry h2').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });
         //headerTitle and feedTitle is checked to not be the same as the new .header-title 
         //and .feed .entry h2 string
         it('should change header title and feed information when the content is changed', function(done) {
            expect(headerTitle).not.toEqual($('.header-title').html());
            expect(feedTitle).not.toEqual($('.feed .entry h2').html());
            done();
         });
         afterEach(function(done) {
            loadFeed(0, done);
         });
    });
}());
