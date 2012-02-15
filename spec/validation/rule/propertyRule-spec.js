/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
describe('property rule test suit', function() {
    KISSY.use('form/validation/rule/propertyRule', function (S, PropertyRule) {
        it('create a rule', function() {
            var rule = new PropertyRule('test', function(a) {
                return a > 1;
            });
            var result = rule.validate(2);
            expect(result).toBeTruthy();
        });
    });
});