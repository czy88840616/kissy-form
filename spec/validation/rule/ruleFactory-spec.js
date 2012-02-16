/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
describe('rule factory test suit', function() {
    KISSY.use('form/validation/rule/html/propertyFactory', function (S, PropertyFactory) {
        it('create factory', function() {
            var factory = new PropertyFactory();
            expect(factory).toBeDefined();
        });

        it('create rule', function() {
            var factory = new PropertyFactory();
            var rule = factory.create('require');
            var result = rule.validate(1);
            expect(result).toBeTruthy();
        });
    });
});