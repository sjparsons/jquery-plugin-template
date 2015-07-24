(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */
  module('dialog', {
    // This will run before each test in this module.
    beforeEach: function() {
      this.elems = $('#example');
    }
  });
  test('is chainable', function() {
    expect(1);
    strictEqual(this.elems.dialog(), this.elems, 'should be chainable');
  });
  test('should return jquery collection', function () {
    var $dialog = this.elems.dialog();
    ok($dialog instanceof $, 'returns jquery collection');
    strictEqual($dialog[0], this.elems[0], 'collection contains element');
    ok($dialog.data('dialog'), 'collection contains data');
  });
  test('should call show method', function () {
    var $dialog = this.elems.dialog();
    ok($dialog.dialog('show'), 'show method called');
    ok($dialog.is(':visible'), 'dialog is visible');	
  });
  test('should call hide method', function () {
    var $dialog = this.elems.dialog();
    ok($dialog.dialog('show'), 'show method called');
    ok($dialog.dialog('hide'), 'hide method called');
    ok($dialog.is(':hidden'), 'dialog is hidden');		
  });
  test('should call destroy method', function () {
    var $dialog = this.elems.dialog();
    ok($dialog.dialog('destroy'), 'destroy method called');
    strictEqual(undefined, $dialog.data('dialog'), 'data on element destroyed');
  });
}(jQuery));
