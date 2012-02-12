/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
describe('rule base', function () {
    KISSY.use('form/validation/rule/base', function (S, Rule) {
        it('base rule', function () {
            var rule = new Rule(function (s) {
                return s > 0;
            });

            var result = rule.validate(-1);
            expect(result).toBeFalsy();
        });

        xit('another base rule', function () {
            var rule = Rule.add(function (s) {
                return s > 5;
            });

            var result = rule.validate(3);
            expect(result).toBeFalsy();
        });

        xit('obj rule', function () {
            var ruleObj = {
                validate:function (a, b) {
                    return a > b;
                }
            };
            var rule = new Rule(ruleObj);

            var result = rule.validate(2, 1);
            expect(result).toBeTruthy();
        });

        xit('obj another rule', function () {
            var ruleObj = {
                validate:function (a, b) {
                    return a > b;
                }
            };
            var rule = Rule.add(ruleObj);

            var result = rule.validate(2, 1);
            expect(result).toBeTruthy();
        });

        xit('add rule name', function () {
            Rule.add('test', function (a, b) {
                return a > b;
            });

            var rule = Rule.get('test');
            expect(rule).toBeDefined();
        });
        
        it('init rule about test value', function() {
            var rule = new Rule(function (s) {
                return s > 0;
            }, {
                args:[4],
                msg:{
                    success:'pass',
                    error:'fail'
                }
            });

            var call = '';

            rule.onError(function(e) {
                call = e.msg;

            });

            rule.validate(-1);
            expect(call).toEqual('fail');

        });

        describe('trigger event', function() {
            it('event listener', function() {
                var rule = new Rule(function (a, b) {
                    return a > b;
                });
                var call = 1;
                rule.on('success', function(e) {
                    call = 2;
                }).on('error', function(e) {
                    call = 3;
                }).validate(2, 4);
                expect(call).toEqual(3);
            });
            
            it('include event and validate result', function() {
                var rule = new Rule(function (a, b) {
                    return a > b;
                });
                var result = rule.on('success', function(e) {
                }).on('error', function(e) {
                }).validate(2, 4);
                expect(result).toBeFalsy();
            });

        });
    });
});