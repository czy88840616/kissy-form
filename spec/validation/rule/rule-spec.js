/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
describe('base', function () {
    KISSY.use('form/validation/rule/base', function (S, Base) {
        it('base rule', function () {
            var rule = new Base(function (s) {
                return s > 0;
            });

            var result = rule.validate(-1);
            expect(result).toBeFalsy();
        });

        it('another base rule', function () {
            var rule = Base.add(function (s) {
                return s > 5;
            });

            var result = rule.validate(3);
            expect(result).toBeFalsy();
        });

        it('obj rule', function () {
            var ruleObj = {
                validate:function (a, b) {
                    return a > b;
                }
            };
            var rule = new Base(ruleObj);

            var result = rule.validate(2, 1);
            expect(result).toBeTruthy();
        });

        it('obj another rule', function () {
            var ruleObj = {
                validate:function (a, b) {
                    return a > b;
                }
            };
            var rule = Base.add(ruleObj);

            var result = rule.validate(2, 1);
            expect(result).toBeTruthy();
        });

        it('add rule name', function () {
            Base.add('test', function (a, b) {
                return a > b;
            });

            var rule = Base.get('test');
            expect(rule).toBeDefined();
        });
    });
});