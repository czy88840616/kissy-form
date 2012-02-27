/**
 * @fileoverview
 * @author 张挺 <zhangting@taobao.com>
 *
 */
describe('field test suite', function() {
    KISSY.use('form/validation/field/field, dom, json', function(S, Field, D, JSON) {
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

            //validate pattern
            expect(f.validate('pattern')).toBeFalsy();

            //use new value to validation
            expect(f.validate('pattern', {args:[2]})).toBeTruthy();
        });

        xit('use property config json', function() {
            $('body').append('<input value="x" required  pattern="[0-9]" id="J_Test"');
            var valid = {
                required:'hello world',
                pattern:'good pattern'
            };

            S.one('#J_Test').attr('data-valid', JSON.parse(valid));
            var f = new Field('#J_Test');

            //validate all
            expect(f.validate()).toBeFalsy();

            //validate single rule
            expect(f.validate('required')).toBeTruthy();
        });

        it('use json param', function() {
            $('body').append('<input value="x" required  pattern="[0-9]" id="J_Test"');
            var valid = {
                event:'focus',
                rules:{
                    required:'hello world',
                    pattern:'good pattern'
                }
            };

            var f = new Field('#J_Test', valid);

            f.validate();
            expect(f.getMessage()).toEqual('good pattern');
        });

        xit('add custom rule', function() {
            $('body').append('<input value="4" required  pattern="[0-9]" id="J_Test"');
            var f = new Field('#J_Test');
            f.addRule('test', function(value) {
                return value == 1;
            }, {
                msg:'test fail'
            });

            //如果初始化没有放入value，那么自动将表单的value填入
            expect(f.validate()).toBeFalsy();
        });
        
        xit('group validation', function() {
            $('body').append('<input value="x" required pattern="[0-9]" id="J_Test"');
            var valid = {
                required:'hello world',
                pattern:'good pattern',
                groups:{
                    a:['require']
                }
            };

            S.one('#J_Test').attr('data-valid', JSON.parse(valid));
            var f = new Field('#J_Test');

            //validate group
            expect(f.validate({
                groups:['a']
            })).toBeTruthy();
        });
    });
});