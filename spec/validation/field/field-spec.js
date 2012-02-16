/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
describe('field test suite', function() {
    KISSY.use('form/validation/field/field, dom', function(S, Field, D) {
        var $ = S.all;
        beforeEach(function() {
            D.remove('#J_Test');
        });

        it('create html field', function() {
            $('body').append('<input value="3" required  id="J_Test"');
            var f = new Field('#J_Test');
            expect(f).toBeDefined();
        });

        it('more property', function() {
            $('body').append('<input value="x" required  pattern="[0-9]" id="J_Test"');
            var f = new Field('#J_Test');

            //validate all
            expect(f.validate()).toBeFalsy();

            //validate single rule
            expect(f.validate('required')).toBeTruthy();
        });
    });
});