/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //Checks every element in allFeeds to see if they have an
         //URL element defined.
         it('should have an URL in every element', function() {
             var arrLength = allFeeds.length;
             for(var i = 0; i < arrLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
             }
         });
         //Checks all the url elements in allFeed that they are
         //not empty.
         it('the URL should not be empty', function() {
             var arrLength = allFeeds.length;
             for(var i = 0; i < arrLength; i++) {
                expect(allFeeds[i].url).not.toBeNull();
             }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         //Checks that all allFeeds elements have a name element defined.
         it('should have a name in every element', function() {
             var arrLength = allFeeds.length;
             for(var i = 0; i < arrLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
             }
         });
         //Checks that the name elements has a value
         it('the name should not be empty', function() {
             var arrLength = allFeeds.length;
             for(var i = 0; i < arrLength; i++) {
                expect(allFeeds[i].name).not.toBeNull();
             }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        var bodyElement = $('body');
        var menuButton = $('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //The menu-hidden class gets toggeled on and of. When it's
         //on the body element the menu bar is hidden.
         it('menu element is hidden by default', function() {
             expect(bodyElement.hasClass('menu-hidden')).toEqual(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          //Checks if the class menu-hidden is toggled off afer the
          //menu button has been clicked.
          it('menu item should be displayed when icon is clicked', function() {
                menuButton.trigger('click');
                expect(bodyElement.hasClass('menu-hidden')).toBe(false);
          });
          //Checks if the menu-hidden class is toggled on again after
          //the menu button has been triggered again.
          it('menu item should be hidden when button is clicked again', function() {
               menuButton.trigger('click');
                expect(bodyElement.hasClass('menu-hidden')).toBe(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var container = $('.feed');

         beforeEach(function(done) {
            loadFeed(0, done);
         });
         //Checks to see that the feed's children element has a length
         //greater than zero.
         it('feed should have atleast one entry element', function(done) {
            expect(container.children.length).toBeGreaterThan(0);
             done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
         //The stored string is checked to not be the same as the new .header-title
         //string.
         it('should change header title when the content is changed', function(done) {
            expect(headerTitle).not.toEqual($('.header-title').html());
            done();
         });
         //The stored string is checked to not be the same as the new .feed .entry h2
         //string.(To get to the string part of the element I had to go thru the classes
         //and elements like so).
         it('should be changes in the feed information', function() {
             expect(feedTitle).not.toEqual($('.feed .entry h2').html());
         });
    });
}());
