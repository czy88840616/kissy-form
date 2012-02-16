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

    S.mix(RuleFactory, {
        require:function(value) {
            return !!value;
        }
        //TODO add another rule
    });


    S.extend(RuleFactory, Base, {
        create: function(ruleName) {
            return new PropertyRule(ruleName, RuleFactory[ruleName]);
        }
    });

    return RuleFactory;

}, {
    requires:[
        'base',
        './propertyRule'
    ]
});