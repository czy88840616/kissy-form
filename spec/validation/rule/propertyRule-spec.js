/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
describe('property rule test suit', function() {
    KISSY.use('form/validation/rule/html/propertyRule', function (S, PropertyRule) {
        it('create a rule', function() {
            var rule = new PropertyRule('test', function(a) {
                return a > 1;
            });
            var result = rule.validate(2);
            expect(result).toBeTruthy();
        });

        it('all args', function() {
            var rule = new PropertyRule('test', function(a) {
                return a > 1;
            }, {
                msg:{
                    success:'pass',
                    error:'fail'
                },
                args:3
            });
            var result = rule.validate();
            expect(result).toBeTruthy();
        });
    });
});