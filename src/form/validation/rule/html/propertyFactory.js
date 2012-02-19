/**
 * @fileoverview html 属性规则工厂
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add(function(S, Base, PropertyRule, undefined) {
    var RuleFactory = function() {
        var self = this;
        RuleFactory.superclass.constructor.call(self);
    };

    //第一个参数一定是属性的value，后面的才是真正的参数
    S.mix(RuleFactory, {
        required :function(pv, value) {
            return !!value;
        },
        pattern: function(pv, value) {
            return new RegExp(pv).test(value);
        }
        //TODO add another rule
    });


    S.extend(RuleFactory, Base, {
        create: function(ruleName, cfg) {
            return new PropertyRule(ruleName, RuleFactory[ruleName], cfg);
        }
    });

    return RuleFactory;

}, {
    requires:[
        'base',
        './propertyRule'
    ]
});