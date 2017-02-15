module.exports = function() {

    this.Then(/^I should see some results$/, function() {
        // driver wair returns a promise so return that
        return driver.wait(until.elementsLocated(by.css('div.g')), 2000).then(function() {
                // return the promise of an element to the following then.
                return driver.findElements(by.css('div.g'));
            })
            .then(function(elements) {
                // verify this element has children
                expect(elements.length).to.not.equal(0);
            });
    });

    this.When(/^I search Google for "([^"]*)"$/, function(searchQuery, done) {
      helpers.loadPage(page.test.url).then(function() {
          // use a method on the page object which also returns a promise
          page.test.preformSearch(searchQuery).then(function(){
            done();
          });
      });
        // driver.get('http://www.google.com.vn');
        // driver.findElement(by.name('q')).then(function(input) {
        //         expect(input).to.exist;
        //         debugger; // <<- your IDE should step in at this point, with the browser open
        //         return input;
        //     })
        //     .then(function(input) {
        //         input.sendKeys(searchQuery);
        //         input.sendKeys(selenium.Key.ENTER);
        //         done(); // <<- let cucumber know you're done
        //     });
    });

    this.Given(/^I am logged in"$/, function() {
        driver.findElement(by.name('usn')).sendKeys(shared.testData.username);
        driver.findElement(by.name('pass')).sendKeys(shared.testData.password);
    });

};
